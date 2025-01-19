import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type UserMetadata = {
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
  phone?: string;
};

export function AccountDetails() {
  const [user, setUser] = useState<UserMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser.user.user_metadata);
        setName(parsedUser.user.user_metadata.name || '');
        setPhone(parsedUser.user.user_metadata.phone || '');
      } catch (err) {
        console.error('Error parsing user data:', err);
        setError('Error loading user data. Please try logging in again.');
      }
    } else {
      setError('No user data found. Please log in.');
    }
    setLoading(false);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(user?.name || '');
    setPhone(user?.phone || '');
  };

  const handleSave = async () => {
    // Here you would typically make an API call to update the user's information
    // For this example, we'll just update the local state and localStorage
    try {
      const updatedUser = { ...user, name, phone };
      setUser(updatedUser);
      
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        parsedUserData.user.user_metadata = updatedUser;
        localStorage.setItem('user', JSON.stringify(parsedUserData));
      }

      setIsEditing(false);
      toast({
        description: "Account details updated successfully.",
      });
    } catch (err) {
      console.error('Error updating user data:', err);
      toast({
        variant: "destructive",
        description: "Failed to update account details. Please try again.",
      });
    }
  };

  if (loading) {
    return <Card><CardContent>Loading account details...</CardContent></Card>;
  }

  if (error) {
    return <Card><CardContent className="text-red-500">{error}</CardContent></Card>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user?.email || ''} disabled />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              disabled={!isEditing} 
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              disabled={!isEditing} 
            />
          </div>
          <div>
            <Label>Email Verified</Label>
            <p>{user?.email_verified ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <Label>Phone Verified</Label>
            <p>{user?.phone_verified ? 'Yes' : 'No'}</p>
          </div>
          {isEditing ? (
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          ) : (
            <Button type="button" onClick={handleEdit}>Edit Details</Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

