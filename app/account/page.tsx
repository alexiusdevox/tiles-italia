"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Settings, ShoppingBag, Package, CreditCard, Bell } from 'lucide-react'

export default function Account() {
  const [activeTab, setActiveTab] = useState("personal")

  const user = {
    name: "Maria Rossi",
    email: "maria.rossi@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Buyer/Seller",
    joinDate: "January 2023"
  }

  const personalInfo = {
    address: "Via Roma 123, 00100 Roma, Italia",
    phone: "+39 123 456 7890",
    dateOfBirth: "1985-05-15"
  }

  const purchaseHistory = [
    { id: "ORD001", date: "2023-05-10", total: 299.99, status: "Delivered" },
    { id: "ORD002", date: "2023-06-15", total: 149.50, status: "Processing" },
    { id: "ORD003", date: "2023-07-01", total: 89.99, status: "Shipped" }
  ]

  const listedItems = [
    { id: "ITEM001", name: "Vintage Ceramic Vase", price: 79.99, status: "Active" },
    { id: "ITEM002", name: "Handmade Tile Set", price: 129.99, status: "Sold" },
    { id: "ITEM003", name: "Decorative Wall Plate", price: 49.99, status: "Active" }
  ]

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row lg:flex-col items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left lg:text-center">
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-center sm:text-left lg:text-center">
                <Badge>{user.role}</Badge>
                <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">List New Item</Button>
              <Button className="w-full" variant="outline">View Messages</Button>
            </CardContent>
          </Card>
        </aside>
        <main className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>Manage your profile, purchases, and settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="personal">
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Personal</span>
                  </TabsTrigger>
                  <TabsTrigger value="purchases">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Purchases</span>
                  </TabsTrigger>
                  <TabsTrigger value="selling">
                    <Package className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Selling</span>
                  </TabsTrigger>
                  <TabsTrigger value="payment">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Payment</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <Bell className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Settings</span>
                  </TabsTrigger>
                </TabsList>
                <div className="mt-6">
                  <TabsContent value="personal">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" defaultValue={personalInfo.address} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" defaultValue={personalInfo.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" type="date" defaultValue={personalInfo.dateOfBirth} />
                        </div>
                      </div>
                      <Button>Save Changes</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="purchases">
                    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {purchaseHistory.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>{order.id}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>€{order.total.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant={order.status === "Delivered" ? "success" : "secondary"}>
                                  {order.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="selling">
                    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {listedItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.id}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>€{item.price.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant={item.status === "Active" ? "success" : "secondary"}>
                                  {item.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                    <Button className="mt-4">List New Item</Button>
                  </TabsContent>
                  <TabsContent value="payment">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Credit/Debit Cards</Label>
                        <div className="flex items-center justify-between p-4 border rounded-md">
                          <div className="flex items-center space-x-4">
                            <CreditCard className="w-6 h-6" />
                            <div>
                              <p className="font-medium">**** **** **** 1234</p>
                              <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                            </div>
                          </div>
                          <Button variant="ghost">Edit</Button>
                        </div>
                      </div>
                      <Button>Add New Payment Method</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="notifications">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="flex-1">Email Notifications</Label>
                        <Switch id="email-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications" className="flex-1">Push Notifications</Label>
                        <Switch id="push-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-notifications" className="flex-1">SMS Notifications</Label>
                        <Switch id="sms-notifications" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="it">Italiano</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Preferred Currency</Label>
                          <Select defaultValue="eur">
                            <SelectTrigger id="currency">
                              <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eur">Euro (€)</SelectItem>
                              <SelectItem value="usd">US Dollar ($)</SelectItem>
                              <SelectItem value="gbp">British Pound (£)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-emails" className="flex-1">Receive Marketing Emails</Label>
                        <Switch id="marketing-emails" />
                      </div>
                      <Button>Save Preferences</Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
// "use client";
// import React, { useState, useEffect } from "react";

// export default function Products() {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [currentPostId, setCurrentPostId] = useState(null);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     const response = await fetch("/api/posts");
//     const data = await response.json();
//     setPosts(data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editMode) {
//       // Modifica post esistente
//       const response = await fetch(`/api/posts`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: currentPostId, title, content }),
//       });
//       if (response.ok) {
//         setTitle("");
//         setContent("");
//         setEditMode(false);
//         setCurrentPostId(null);
//         fetchPosts();
//       }
//     } else {
//       // Crea nuovo post
//       const response = await fetch("/api/posts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, content }),
//       });
//       if (response.ok) {
//         setTitle("");
//         setContent("");
//         fetchPosts();
//       }
//     }
//   };

//   const handleEdit = (post) => {
//     setTitle(post.title);
//     setContent(post.content);
//     setEditMode(true);
//     setCurrentPostId(post.id);
//   };

//   const handleDelete = async (id) => {
//     const response = await fetch(`/api/posts`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     if (response.ok) {
//       fetchPosts();
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Posts</h1>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//           className="border p-2 mr-2"
//         />
//         <input
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Content"
//           className="border p-2 mr-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2">
//           {editMode ? "Update Post" : "Add Post"}
//         </button>
//       </form>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id} className="mb-2">
//             <h2 className="font-bold">{post.title}</h2>
//             <p>{post.content}</p>
//             <button
//               onClick={() => handleEdit(post)}
//               className="bg-yellow-500 text-white p-2 mr-2"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(post.id)}
//               className="bg-red-500 text-white p-2"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
