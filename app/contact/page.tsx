'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from "@/hooks/use-toast"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

const formSchema = z.object({
    name: z.string().min(2, { message: "Il nome deve essere di almeno 2 caratteri" }),
    email: z.string().email({ message: "Email non valida" }),
    messageType: z.string({ required_error: "Seleziona un tipo di messaggio" }),
    subject: z.string().min(5, { message: "L'oggetto deve essere di almeno 5 caratteri" }),
    message: z.string().min(10, { message: "Il messaggio deve essere di almeno 10 caratteri" }),
})

export default function ContattiPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        // Simula l'invio del form
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSubmitting(false)
        toast({
            title: "Messaggio inviato",
            description: "Grazie per averci contattato. Ti risponderemo al più presto.",
        })
        reset()
    }

    return (
        <main className="flex-grow mx-auto max-w-screen-xl py-16 px-4 sm:px-6 lg:px-8 relative">
            <nav className="py-2">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Contact</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>
            <h1 className="text-5xl pb-16 font-semibold text-[#7A7157]">Contact</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Invia un messaggio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                                <Input id="name" {...register('name')} aria-invalid={errors.name ? "true" : "false"} />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                <Input id="email" type="email" {...register('email')} aria-invalid={errors.email ? "true" : "false"} />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="messageType" className="block text-sm font-medium mb-1">Tipo di messaggio</label>
                                <Select onValueChange={(value) => register('messageType').onChange({ target: { value } })}>
                                    <SelectTrigger id="messageType">
                                        <SelectValue placeholder="Seleziona il tipo di messaggio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="info">Richiesta informazioni</SelectItem>
                                        <SelectItem value="order">Ordine</SelectItem>
                                        <SelectItem value="support">Supporto tecnico</SelectItem>
                                        <SelectItem value="other">Altro</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.messageType && <p className="text-red-500 text-sm mt-1">{errors.messageType.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-1">Oggetto</label>
                                <Input id="subject" {...register('subject')} aria-invalid={errors.subject ? "true" : "false"} />
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">Messaggio</label>
                                <Textarea id="message" {...register('message')} rows={4} aria-invalid={errors.message ? "true" : "false"} />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informazioni di contatto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <MapPin className="text-primary" strokeWidth={1.5} />
                                <span>Via delle Piastrelle, 123, 12345 Ceramica (CE)</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="text-primary" strokeWidth={1.5} />
                                <span>+39 123 456 7890</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="text-primary" strokeWidth={1.5} />
                                <span>info@gresporcellanato.it</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </main>
    )
}