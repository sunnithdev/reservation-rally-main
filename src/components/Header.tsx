import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const navigate = useNavigate()
  const [user, setUser] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const customer = localStorage.getItem("customer")
    if (customer) {
      const customerData = JSON.parse(customer)
      setUser(customerData.user.user_metadata.full_name)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    navigate("/")
    setIsMenuOpen(false)
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-serif text-red-900">
            TableMaster
          </Link>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <nav className="hidden md:flex space-x-6">
            <NavLinks />
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <UserActions user={user} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <NavLinks />
          </nav>
          <div className="px-4 py-2">
            <UserActions user={user} handleLogout={handleLogout} />
          </div>
        </div>
      )}
    </header>
  )
}

function NavLinks() {
  return (
    <>
      <Link to="/restaurants" className="block text-sm font-medium hover:text-primary transition-colors">
        Restaurants
      </Link>
      <Link to="/membership" className="block text-sm font-medium hover:text-primary transition-colors">
        Membership
      </Link>
    </>
  )
}

function UserActions({ user, handleLogout }: { user: string | null; handleLogout: () => void }) {
  return user ? (
    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
      <Button asChild>
        <Link to="bookings" className="text-sm font-semibold">
          {user}
        </Link>
      </Button>
      <Button variant="ghost" onClick={handleLogout} className="text-sm">
        Logout
      </Button>
    </div>
  ) : (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
      <Button asChild>
        <Link to="user-auth">Sign In</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link to="/signup">For Restaurants</Link>
      </Button>
    </div>
  )
}

