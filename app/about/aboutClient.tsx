import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import Link from 'next/link'

export default function AboutClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[url('/about.jpg')] bg-cover bg-center">
        <div className="bg-[#C9BB84] bg-opacity-60">
          <div className="container mx-auto py-20 px-4 text-black">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl text-center mb-6">About us</h1>
            
            
            <div className="text-center mx-auto max-w-[700px] md:text-lg">
              <p className="mb-3">TileVista is the exclusive <span className="font-bold">B2B platform</span> for Italian porcelain stoneware tiles, crafted to meet the needs of construction professionals, interior designers, and premium material distributors.</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow bg-gray-100">
        <section className="container mx-auto py-16 md:py-24 lg:py-32 px-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16">Our Story</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                Born from a passion for Italian excellence in design and building materials, TileVista stands out for its commitment to quality and innovation. With a robust network of suppliers and clients, the company has established itself as a trusted source for premium materials that embody the essence of Italian craftsmanship.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/our-story.jpg"
                alt="Our story illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Our Mission</h2>
            <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
              Our mission is to facilitate access to the finest Italian tiles for industry professionals worldwide. We are committed to offering a curated selection of high-quality products, providing customized solutions for every project requirement, ensuring excellent customer service and specialized technical support, and promoting sustainable practices in production and distribution.
            </p>
          </div>
        </section>

        <section className="container mx-auto py-16 md:py-24 lg:py-32 px-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Quality", description: "We collaborate only with certified and renowned suppliers to guarantee excellent products." },
              { title: "Innovation", description: "We are always searching for the latest trends and technologies in the tile industry." },
              { title: "Sustainability", description: "We promote eco-friendly products and processes to reduce environmental impact." },
              { title: "Reliability", description: "We keep our commitments to our customers, ensuring punctual deliveries and constant support." },
              { title: "Transparency", description: "We communicate clearly and honestly with customers and partners." },
            ].map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">We offer a wide range of porcelain stoneware tiles suitable for:</h3>
                <ul className="list-disc list-inside space-y-3 text-lg">
                  <li>Indoor and outdoor flooring</li>
                  <li>Wall coverings</li>
                  <li>Solutions for commercial and residential environments</li>
                  <li>Customizable formats and finishes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">All our products are characterized by:</h3>
                <ul className="list-disc list-inside space-y-3 text-lg">
                  <li>High resistance to wear and chemical agents</li>
                  <li>Low water absorption</li>
                  <li>Easy maintenance</li>
                  <li>Cutting-edge design</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/our-products.jpg"
                alt="Product showcase"
                width={800}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto py-16 md:py-24 lg:py-32 px-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Experience", description: "Years of presence in the sector have allowed us to build a solid reputation." },
              { title: "Supplier Network", description: "We collaborate with the best Italian manufacturers to offer superior quality products." },
              { title: "Personalized Service", description: "Our team of experts is always ready to assist customers in choosing the most suitable products." },
              { title: "Efficient Logistics", description: "We guarantee fast and secure deliveries worldwide." },
              { title: "Commitment to Innovation", description: "We constantly invest in research and development to offer the most advanced solutions." },
            ].map((reason, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                  <p>{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-black text-primary-foreground py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="bg-background text-foreground rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                Transform Your Project with Premium Italian Tiles
              </h2>
              <p className="text-lg text-center mb-8 text-muted-foreground">
                Get access to our exclusive collection of high-quality porcelain stoneware tiles and expert consultation for your next project.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" /> Schedule a Consultation
                </Button>
              </div>
              <p className="text-sm text-center mt-6 text-muted-foreground">
                No obligation. Our team of experts is ready to assist you.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}