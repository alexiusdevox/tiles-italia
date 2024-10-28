// "use client"; // Assicurati di contrassegnare il componente come Client Component

// import { useEffect, useState } from "react";
// import { createClient } from "@/utils/supabase/client";

// export default function UserProfile() {
//   const supabase = createClient();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({ name: '', email: '' }); // Aggiungi altri campi se necessario

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const { data, error } = await supabase.from("user_profiles").select("*").single();
//       if (error) {
//         console.error("Error fetching profile:", error);
//         setError(error.message);
//       } else {
//         setProfile(data);
//         setFormData({ name: data.name, email: data.email }); // Imposta i dati nel modulo
//       }
//       setLoading(false);
//     };

//     fetchProfile();
//   }, [supabase]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { error } = await supabase
//       .from("user_profiles")
//       .update(formData)
//       .eq("user_id", profile.user_id); // Assicurati di avere l'ID dell'utente

//     if (error) {
//       console.error("Error updating profile:", error);
//       setError(error.message);
//     } else {
//       alert("Profile updated successfully!");
//       setProfile({ ...profile, ...formData }); // Aggiorna lo stato locale con i nuovi dati
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </label>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </label>
//         {/* Aggiungi altri campi se necessario */}
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// }
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Settings, ShoppingBag, Package, CreditCard, Bell, Phone, Building, Truck, Edit, Plus } from 'lucide-react'

export default function Account() {
  const [activeTab, setActiveTab] = useState("personal")

  const user = {
    name: "Maria Rossi",
    email: "maria.rossi@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Acquirente",
    joinDate: "Gennaio 2023"
  }

  const personalInfo = {
    address: "Via Roma 123, 00100 Roma, Italia",
    phone: "+39 123 456 7890",
    dateOfBirth: "15/05/1985"
  }

  const purchaseHistory = [
    { id: "ORD001", date: "10/05/2023", total: 299.99, status: "Consegnato" },
    { id: "ORD002", date: "15/06/2023", total: 149.50, status: "In lavorazione" },
    { id: "ORD003", date: "01/07/2023", total: 89.99, status: "Spedito" }
  ]

  const listedItems = [
    { id: "ITEM001", name: "Vaso in Ceramica Vintage", price: 79.99, status: "Attivo" },
    { id: "ITEM002", name: "Set di Piastrelle Fatte a Mano", price: 129.99, status: "Venduto" },
    { id: "ITEM003", name: "Piatto Decorativo da Parete", price: 49.99, status: "Attivo" }
  ]

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Il Tuo Account</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24 border-4 border-primary-foreground">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-primary-foreground/80">{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2 text-center">
                <Badge className="text-sm px-3 py-1">{user.role}</Badge>
                <p className="text-sm text-muted-foreground">Membro da {user.joinDate}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Azioni Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full flex items-center justify-center" size="lg">
                <Plus className="mr-2 h-4 w-4" /> Inserisci Nuovo Articolo
              </Button>
              <Button className="w-full flex items-center justify-center" variant="outline" size="lg">
                <Bell className="mr-2 h-4 w-4" /> Visualizza Messaggi
              </Button>
            </CardContent>
          </Card>
        </aside>
        <main className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Gestione Account</CardTitle>
              <CardDescription>Gestisci il tuo profilo, gli acquisti e le impostazioni.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2">
                  {[
                    { value: "personal", icon: User, label: "Personale" },
                    { value: "purchases", icon: ShoppingBag, label: "Acquisti" },
                    { value: "selling", icon: Package, label: "Vendite" },
                    { value: "payment", icon: CreditCard, label: "Pagamenti" },
                    { value: "notifications", icon: Bell, label: "Notifiche" },
                    { value: "settings", icon: Settings, label: "Impostazioni" }
                  ].map(({ value, icon: Icon, label }) => (
                    <TabsTrigger key={value} value={value} className="flex items-center justify-center py-2 px-3">
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">{label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="mt-6 space-y-6">
                  <TabsContent value="personal">
                    <div className="space-y-6">
                      {[
                        { icon: Building, label: "Azienda", value: user.name },
                        { icon: User, label: "Email", value: user.email },
                        { icon: Phone, label: "Numero di telefono", value: personalInfo.phone },
                        { icon: Truck, label: "Indirizzo di Spedizione Predefinito", value: "Via Roma 123, 20100 Milano (MI)" }
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{label}</p>
                            <p className="text-sm text-muted-foreground">{value}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifica {label}</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="purchases">
                    <ScrollArea className="h-[400px] rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID Ordine</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Totale</TableHead>
                            <TableHead>Stato</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {purchaseHistory.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>€{order.total.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant={order.status === "Consegnato" ? "success" : "secondary"}>
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
                    <ScrollArea className="h-[400px] rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID Articolo</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Prezzo</TableHead>
                            <TableHead>Stato</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {listedItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.id}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>€{item.price.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant={item.status === "Attivo" ? "success" : "secondary"}>
                                  {item.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Inserisci Nuovo Articolo
                    </Button>
                  </TabsContent>
                  <TabsContent value="payment">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Carte di Credito/Debito</h3>
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div className="flex items-center space-x-4">
                            <CreditCard className="w-8 h-8 text-primary" />
                            <div>
                              <p className="font-medium">**** **** **** 1234</p>
                              <p className="text-sm text-muted-foreground">Scade 12/2025</p>
                            </div>
                          </div>
                          <Button variant="ghost">Modifica</Button>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Aggiungi Nuovo Metodo di Pagamento
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="notifications">
                    <div className="space-y-6">
                      {[
                        { id: "email-notifications", label: "Notifiche Email", description: "Ricevi aggiornamenti via email" },
                        { id: "push-notifications", label: "Notifiche Push", description: "Ricevi notifiche sul tuo dispositivo" },
                        { id: "sms-notifications", label: "Notifiche SMS", description: "Ricevi aggiornamenti via SMS" }
                      ].map(({ id, label, description }) => (
                        <div key={id} className="flex items-center justify-between space-x-4">
                          <div className="flex-1 space-y-1">
                            <Label htmlFor={id} className="text-base font-medium">{label}</Label>
                            <p className="text-sm text-muted-foreground">{description}</p>
                          </div>
                          <Switch id={id} />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="settings">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="language" className="text-base font-medium">Lingua</Label>
                          <Select defaultValue="it">
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Seleziona Lingua" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="it">Italiano</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency" className="text-base font-medium">Valuta Preferita</Label>
                          <Select defaultValue="eur">
                            <SelectTrigger id="currency">
                              <SelectValue placeholder="Seleziona Valuta" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eur">Euro (€)</SelectItem>
                              <SelectItem value="usd">Dollaro USA ($)</SelectItem>
                              <SelectItem value="gbp">Sterlina Britannica (£)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="marketing-emails" className="text-base font-medium">Ricevi Email di Marketing</Label>
                          <p className="text-sm text-muted-foreground">Ricevi offerte speciali e aggiornamenti</p>
                        </div>
                        <Switch id="marketing-emails" />
                      </div>
                      <Button className="w-full">Salva Preferenze</Button>
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
