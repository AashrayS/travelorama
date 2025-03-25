
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, CreditCard, Heart, MapPin, LogOut, ChevronRight, Home, Car, HelpCircle, Bell, Globe, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Account = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Travel enthusiast and photography lover. Always looking for the next adventure!'
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true
  });
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  const trips = [
    {
      id: '1',
      title: 'Weekend in New York',
      date: 'July 15-17, 2023',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Beach Getaway in Miami',
      date: 'August 5-10, 2023',
      image: 'https://images.unsplash.com/photo-1506924547953-83ea97ddd2b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      status: 'upcoming'
    }
  ];
  
  const saved = [
    {
      id: '1',
      title: 'Modern Beach House with Ocean View',
      location: 'Malibu, California',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      type: 'property'
    },
    {
      id: '2',
      title: 'Tesla Model 3',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
      type: 'transport'
    },
    {
      id: '3',
      title: 'Hidden Beach Cove',
      location: 'Big Sur, California',
      image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      type: 'place'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 space-y-6">
              <div className="glass p-4 rounded-xl">
                <div className="flex items-center space-x-4 p-2">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{personalInfo.name}</h2>
                    <p className="text-sm text-muted-foreground">Member since 2022</p>
                  </div>
                </div>
                
                <nav className="mt-6 space-y-1">
                  <Link 
                    to="/account" 
                    className="flex items-center justify-between p-3 rounded-lg bg-primary/10 text-primary"
                  >
                    <div className="flex items-center">
                      <User size={18} className="mr-3" />
                      Personal Info
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                  
                  <Link 
                    to="/account/trips" 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary text-foreground"
                  >
                    <div className="flex items-center">
                      <Home size={18} className="mr-3" />
                      Trips
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                  
                  <Link 
                    to="/account/saved" 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary text-foreground"
                  >
                    <div className="flex items-center">
                      <Heart size={18} className="mr-3" />
                      Saved
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                  
                  <Link 
                    to="/account/payments" 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary text-foreground"
                  >
                    <div className="flex items-center">
                      <CreditCard size={18} className="mr-3" />
                      Payments
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                  
                  <Link 
                    to="/account/settings" 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary text-foreground"
                  >
                    <div className="flex items-center">
                      <Settings size={18} className="mr-3" />
                      Settings
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                </nav>
                
                <Separator className="my-4" />
                
                <div className="space-y-1">
                  <Link 
                    to="/help" 
                    className="flex items-center p-3 rounded-lg hover:bg-secondary text-foreground"
                  >
                    <HelpCircle size={18} className="mr-3" />
                    Help
                  </Link>
                  
                  <button 
                    className="flex items-center w-full p-3 rounded-lg hover:bg-secondary text-foreground text-left"
                  >
                    <LogOut size={18} className="mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            </aside>
            
            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="personal-info">
                <TabsList className="w-full mb-8 border-b">
                  <TabsTrigger value="personal-info" className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    Preferences
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal-info" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and how we can reach you
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={personalInfo.name}
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          className="w-full p-2 border border-input bg-transparent rounded-md"
                          value={personalInfo.bio}
                          onChange={handlePersonalInfoChange}
                        />
                        <p className="text-sm text-muted-foreground">
                          Brief description for your profile. URLs are hyperlinked.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Profile Photo</Label>
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <Button variant="outline" size="sm" className="mb-2">
                              Change photo
                            </Button>
                            <p className="text-xs text-muted-foreground">
                              JPG, GIF or PNG. 1MB max.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save changes</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Public Profile</CardTitle>
                      <CardDescription>
                        Control what information is shown on your public profile
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Show my trips</Label>
                          <p className="text-sm text-muted-foreground">
                            Share your past trips with the community
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Show recommendations</Label>
                          <p className="text-sm text-muted-foreground">
                            Let others see places you've recommended
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Hide contact information</Label>
                          <p className="text-sm text-muted-foreground">
                            Keep your email and phone private
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Login Security</CardTitle>
                      <CardDescription>
                        Manage your password and account security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm font-medium">Password requirements:</p>
                        <ul className="text-sm text-muted-foreground pl-4 space-y-1 mt-1 list-disc">
                          <li>Minimum 8 characters</li>
                          <li>At least one uppercase letter</li>
                          <li>At least one number</li>
                          <li>At least one special character</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Update password</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>
                        Add an extra layer of security to your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Two-factor authentication</div>
                          <p className="text-sm text-muted-foreground">
                            Require a verification code when logging in
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        We'll send a verification code to your email or phone when you log in on a new device.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Account Access</CardTitle>
                          <CardDescription>Manage devices and sessions</CardDescription>
                        </div>
                        <Shield className="text-muted-foreground" size={20} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 border border-border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">MacBook Pro - Chrome</p>
                              <p className="text-sm text-muted-foreground">
                                San Francisco, CA - Current session
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Log out
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-3 border border-border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">iPhone 13 - Safari</p>
                              <p className="text-sm text-muted-foreground">
                                San Francisco, CA - Last active today
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Log out
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">
                        Log out of all devices
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Decide how you want to be notified
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium flex items-center">
                          <Bell size={16} className="mr-2" />
                          Email Notifications
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-bookings" className="flex-1">
                              Booking confirmations and updates
                            </Label>
                            <Switch 
                              id="email-bookings" 
                              checked={notifications.email} 
                              onCheckedChange={() => handleNotificationChange('email')} 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-marketing" className="flex-1">
                              Marketing and promotions
                            </Label>
                            <Switch 
                              id="email-marketing" 
                              checked={notifications.marketing} 
                              onCheckedChange={() => handleNotificationChange('marketing')} 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-updates" className="flex-1">
                              Platform updates and new features
                            </Label>
                            <Switch 
                              id="email-updates" 
                              checked={notifications.updates} 
                              onCheckedChange={() => handleNotificationChange('updates')} 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium flex items-center">
                          <Bell size={16} className="mr-2" />
                          Push Notifications
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="push-bookings" className="flex-1">
                              Booking confirmations and updates
                            </Label>
                            <Switch 
                              id="push-bookings" 
                              checked={notifications.push} 
                              onCheckedChange={() => handleNotificationChange('push')} 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="push-marketing" className="flex-1">
                              Marketing and promotions
                            </Label>
                            <Switch id="push-marketing" checked={false} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="push-updates" className="flex-1">
                              Platform updates and new features
                            </Label>
                            <Switch id="push-updates" checked={true} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save preferences</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>App Preferences</CardTitle>
                      <CardDescription>
                        Customize your experience on Masterplan
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium flex items-center">
                            <Globe size={16} className="mr-2" />
                            Language
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Choose your preferred language
                          </p>
                        </div>
                        <select className="p-2 border border-input rounded-md bg-transparent">
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="it">Italiano</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Currency</div>
                          <p className="text-sm text-muted-foreground">
                            Set your preferred currency for prices
                          </p>
                        </div>
                        <select className="p-2 border border-input rounded-md bg-transparent">
                          <option value="usd">USD ($)</option>
                          <option value="eur">EUR (€)</option>
                          <option value="gbp">GBP (£)</option>
                          <option value="jpy">JPY (¥)</option>
                          <option value="cad">CAD ($)</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Distance unit</div>
                          <p className="text-sm text-muted-foreground">
                            Choose between miles or kilometers
                          </p>
                        </div>
                        <select className="p-2 border border-input rounded-md bg-transparent">
                          <option value="mi">Miles (mi)</option>
                          <option value="km">Kilometers (km)</option>
                        </select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save preferences</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Preferences</CardTitle>
                      <CardDescription>
                        Customize what content you see
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Featured destinations</div>
                          <p className="text-sm text-muted-foreground">
                            Show personalized destination recommendations
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Travel categories</div>
                          <p className="text-sm text-muted-foreground">
                            Select your travel interests
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button variant="outline" size="sm" className="rounded-full">Beach</Button>
                        <Button variant="outline" size="sm" className="rounded-full bg-primary/10">Mountains</Button>
                        <Button variant="outline" size="sm" className="rounded-full">City</Button>
                        <Button variant="outline" size="sm" className="rounded-full bg-primary/10">Adventure</Button>
                        <Button variant="outline" size="sm" className="rounded-full bg-primary/10">Culture</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Food</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Relaxation</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Nightlife</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 space-y-6">
                <h2 className="text-xl font-semibold">Your Trips</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trips.map((trip) => (
                    <Link key={trip.id} to={`/trips/${trip.id}`} className="block">
                      <div className="border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md">
                        <div className="relative h-40">
                          <img 
                            src={trip.image} 
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-white">
                            {trip.status === 'completed' ? 'Completed' : 'Upcoming'}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{trip.title}</h3>
                          <p className="text-sm text-muted-foreground">{trip.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button variant="outline" asChild>
                    <Link to="/trips">View all trips</Link>
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                <h2 className="text-xl font-semibold">Saved Items</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {saved.map((item) => (
                    <Link 
                      key={item.id} 
                      to={`/${item.type === 'property' ? 'property' : item.type === 'transport' ? 'transport' : 'place'}/${item.id}`}
                      className="block"
                    >
                      <div className="border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md">
                        <div className="relative h-40">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/70 backdrop-blur-sm">
                            <Heart size={16} className="fill-red-500 stroke-red-500" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin size={14} className="mr-1" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button variant="outline" asChild>
                    <Link to="/saved">View all saved</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
