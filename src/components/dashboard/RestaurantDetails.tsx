import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil } from 'lucide-react'

export function RestaurantDetails() {
  const [restaurant, setRestaurant] = useState<any>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedRestaurant, setEditedRestaurant] = useState<any>(null)

  useEffect(() => {
    const fetchRestaurant = async () => {
      setIsLoading(true)
      try {
        const user_data = localStorage.getItem('user')
        const userId = JSON.parse(user_data || '{}')?.session?.user?.id

        const response = await fetch(`http://localhost:5000/api/restaurants/user/${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant")
        }

        const data = await response.json()
        const restaurantData = data[0]
        
        if (restaurantData) {
          localStorage.setItem('restaurantId', JSON.stringify(restaurantData.id))
          setRestaurant(restaurantData)
          setIsEditing(false)
        } else {
          // Initialize empty restaurant data when no restaurant exists
          const emptyRestaurant = {
            name: '',
            description: '',
            address: '',
            location: '',
            rating: 0,
            michelin: false,
            price_range: '',
            images: [],
            features: []
          }
          setRestaurant(emptyRestaurant)
          setEditedRestaurant(emptyRestaurant)
          setIsEditing(true)
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRestaurant()
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
    setEditedRestaurant({ ...restaurant })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedRestaurant(null)
    setImageFiles([])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedRestaurant({ ...editedRestaurant, [e.target.name]: e.target.value })
  }

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRestaurant({ 
      ...editedRestaurant, 
      features: e.target.value.split(',').map(feature => feature.trim()) 
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const imageUrls = imageFiles.length > 0 ? await uploadImages(imageFiles) : restaurant.images
      const user_data = localStorage.getItem('user')
      
      // Only include editable fields when updating
      const restaurantData = restaurant._id ? {
        description: editedRestaurant.description,
        rating: editedRestaurant.rating,
        features: editedRestaurant.features,
        images: imageUrls,
        user_id: JSON.parse(user_data || '{}')?.session?.user?.id
      } : {
        ...editedRestaurant,
        images: imageUrls,
        user_id: JSON.parse(user_data || '{}')?.session?.user?.id
      }

      const url = restaurant._id 
        ? `http://localhost:5000/api/restaurants/${restaurant._id}`
        : 'http://localhost:5000/api/restaurants'
      
      const method = restaurant._id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantData)
      })

      if (!response.ok) {
        throw new Error("Failed to save restaurant details")
      }

      const savedData = await response.json()
      setRestaurant(restaurant._id ? { ...restaurant, ...restaurantData } : savedData)
      setIsEditing(false)
      setEditedRestaurant(null)
      setImageFiles([])
      alert(restaurant._id ? 'Restaurant details updated successfully!' : 'Restaurant added successfully!')
    } catch (error) {
      console.error("Error saving restaurant details:", error)
      alert('Failed to save restaurant details. Please try again.')
    }
  }

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const CLOUD_NAME = 'dnkgg3jkt'
    const UPLOAD_PRESET = 'h5qwp9km'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', UPLOAD_PRESET)

        const response = await fetch(UPLOAD_URL, { method: 'POST', body: formData })
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`)
        }

        const data = await response.json()
        return data.secure_url
      })

      return await Promise.all(uploadPromises)
    } catch (error) {
      console.error("Error uploading images:", error)
      throw error
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {restaurant._id ? 'Restaurant Details' : 'Add Your Restaurant Details'}
        </CardTitle>
        {!isEditing && restaurant._id && (
          <Button onClick={handleEditClick} variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input
                id="name"
                name="name"
                value={editedRestaurant.name}
                onChange={handleInputChange}
                required
                disabled={restaurant._id}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={editedRestaurant.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={editedRestaurant.address}
                onChange={handleInputChange}
                required
                disabled={restaurant._id}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={editedRestaurant.location}
                onChange={handleInputChange}
                required
                disabled={restaurant._id}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={editedRestaurant.rating}
                onChange={handleInputChange}
                required
              />
            </div>
            {!restaurant._id && (
              <div className="space-y-2">
                <Label htmlFor="price_range">Price Range</Label>
                <Select 
                  onValueChange={(value) => setEditedRestaurant({ ...editedRestaurant, price_range: value })} 
                  value={editedRestaurant.price_range}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$">$</SelectItem>
                    <SelectItem value="$$">$$</SelectItem>
                    <SelectItem value="$$$">$$$</SelectItem>
                    <SelectItem value="$$$$">$$$$</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="images">Upload Images</Label>
              <Input
                id="images"
                name="images"
                type="file"
                multiple
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input
                id="features"
                name="features"
                value={editedRestaurant.features?.join(', ')}
                onChange={handleFeaturesChange}
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit">
                {restaurant._id ? 'Save Changes' : 'Add Restaurant'}
              </Button>
              {restaurant._id && (
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Restaurant Name</h3>
              <p className="text-gray-600">{restaurant.name}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{restaurant.description}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Address</h3>
              <p className="text-gray-600">{restaurant.address}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Location</h3>
              <p className="text-gray-600">{restaurant.location}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Rating</h3>
              <p className="text-gray-600">{restaurant.rating} / 5</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <p className="text-gray-600">{restaurant.price_range}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Features</h3>
              <p className="text-gray-600">{restaurant.features?.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurant.images?.map((image: string, index: number) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Restaurant ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}