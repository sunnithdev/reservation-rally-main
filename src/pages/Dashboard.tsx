import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LogOut, Store, Calendar, UserPlus, CreditCard, User } from 'lucide-react'
import { RestaurantDetails } from '@/components/dashboard/RestaurantDetails'
import { Reservations } from '@/components/dashboard/Reservations'
import { Waitlist } from '@/components/dashboard/Waitlist'
import { BankDetails } from '@/components/dashboard/BankDetails'
import { AccountDetails } from '@/components/dashboard/AccountDetails'
import { RestaurantBookingsPage } from '@/components/dashboard/RestaurantBookingsPage'
const Dashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('restaurant-details')

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navItems = [
    { id: 'restaurant-details', label: 'Restaurant Details', icon: Store, component: RestaurantDetails },
    { id: 'restaurant-bookings', label: 'Restaurant Reservations', icon: Store, component: RestaurantBookingsPage },
    { id: 'reservations', label: 'Add Reservations', icon: Calendar, component: Reservations },
    { id: 'waitlist', label: 'Waitlist', icon: UserPlus, component: Waitlist },
    { id: 'bank-details', label: 'Your Bank Details', icon: CreditCard, component: BankDetails },
    { id: 'account-details', label: 'Account Details', icon: User, component: AccountDetails },
  ]

  const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || RestaurantDetails

  return (
    <div className="min-h-screen bg-gray-100">
      <Card className="m-4">
        <div className="flex flex-col h-[calc(100vh-2rem)]">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h1 className="text-2xl font-bold">TableMaster</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.user_metadata?.name || user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Left Navigation */}
            <div className="w-64 p-4 border-r overflow-y-auto">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-auto">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
