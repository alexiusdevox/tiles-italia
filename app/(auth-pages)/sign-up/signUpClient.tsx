"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpClient() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    vat: '',
    businessPurpose: '',
    address: '',
    country: '',
    city: '',
    state: '',
    postalCode: '',
    password: '',
    confirmPassword: '',
    whatsappNotifications: false,
    termsAccepted: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, country: value }))
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData(prevState => ({ ...prevState, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add logic here to submit the form data
    console.log(formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Unlock access to a world of tile export opportunities by signing up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Your Full Name *</Label>
              <Input id="fullName" name="fullName" placeholder="Full Name" required 
                     value={formData.fullName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your Email *</Label>
              <Input id="email" name="email" type="email" placeholder="hi@example.com" required 
                     value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input id="companyName" name="companyName" placeholder="e.g. ABC Co" required 
                     value={formData.companyName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Company Email *</Label>
              <Input id="companyEmail" name="companyEmail" type="email" placeholder="hi@example.com" required 
                     value={formData.companyEmail} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyPhone">Company Phone *</Label>
              <Input id="companyPhone" name="companyPhone" placeholder="e.g. 555-1234" required 
                     value={formData.companyPhone} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vat">VAT Number *</Label>
              <Input id="vat" name="vat" placeholder="VAT Number" required 
                     value={formData.vat} onChange={handleInputChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="businessPurpose">Business Purpose *</Label>
              <Input id="businessPurpose" name="businessPurpose" placeholder="e.g. We sell tiles" required 
                     value={formData.businessPurpose} onChange={handleInputChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Company Address *</Label>
              <Input id="address" name="address" placeholder="123 Main St" required 
                     value={formData.address} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select onValueChange={handleSelectChange} value={formData.country}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input id="city" name="city" placeholder="City" required 
                     value={formData.city} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input id="state" name="state" placeholder="State" required 
                     value={formData.state} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input id="postalCode" name="postalCode" placeholder="Postal Code" required 
                     value={formData.postalCode} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required 
                     value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Re-enter your password" required 
                     value={formData.confirmPassword} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="whatsappNotifications" 
                checked={formData.whatsappNotifications} 
                onCheckedChange={handleCheckboxChange('whatsappNotifications')}
              />
              <Label htmlFor="whatsappNotifications">Subscribe to WhatsApp notifications?</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="termsAccepted" 
                checked={formData.termsAccepted} 
                onCheckedChange={handleCheckboxChange('termsAccepted')}
                required
              />
              <Label htmlFor="termsAccepted">I accept the Terms and Privacy Policy *</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">Register</Button>
      </CardFooter>
    </Card>
  )
}


















// import { signUpAction } from "@/app/actions";
// import { FormMessage, Message } from "@/components/form-message";
// import { SubmitButton } from "@/components/submit-button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import { SmtpMessage } from "../smtp-message";

// export default function Signup({ searchParams }: { searchParams: Message }) {
//   if ("message" in searchParams) {
//     return (
//       <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
//         <FormMessage message={searchParams} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <form className="flex flex-col min-w-64 max-w-64 mx-auto">
//         <h1 className="text-2xl font-medium">Sign up</h1>
//         <p className="text-sm text text-foreground">
//           Already have an account?{" "}
//           <Link className="text-primary font-medium underline" href="/sign-in">
//             Sign in
//           </Link>
//         </p>
//         <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//           <Label htmlFor="email">Email</Label>
//           <Input name="email" placeholder="you@example.com" required />
//           <Label htmlFor="password">Password</Label>
//           <Input
//             type="password"
//             name="password"
//             placeholder="Your password"
//             minLength={6}
//             required
//           />
//           <SubmitButton formAction={signUpAction} pendingText="Signing up...">
//             Sign up
//           </SubmitButton>
//           <FormMessage message={searchParams} />
//         </div>
//       </form>
//       <SmtpMessage />
//     </>
//   );
// }