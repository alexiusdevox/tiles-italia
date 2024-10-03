import { Card, CardContent } from "@/components/ui/card"
import { Grid, Layers, Mountain, Palette, Shapes, Square, Hexagon, Gem } from 'lucide-react'

interface CategoryProps {
  name: string
  icon: React.ReactNode
  color: string
}

const categories: CategoryProps[] = [
  { name: "Floor Tiles", icon: <Grid className="h-8 w-8" />, color: "bg-blue-500" },
  { name: "Wall Tiles", icon: <Layers className="h-8 w-8" />, color: "bg-green-500" },
  { name: "Outdoor Tiles", icon: <Mountain className="h-8 w-8" />, color: "bg-yellow-500" },
  { name: "Decorative Tiles", icon: <Palette className="h-8 w-8" />, color: "bg-purple-500" },
  { name: "Mosaic Tiles", icon: <Shapes className="h-8 w-8" />, color: "bg-red-500" },
  { name: "Porcelain Tiles", icon: <Square className="h-8 w-8" />, color: "bg-indigo-500" },
  { name: "Ceramic Tiles", icon: <Hexagon className="h-8 w-8" />, color: "bg-pink-500" },
  { name: "Specialty Tiles", icon: <Gem className="h-8 w-8" />, color: "bg-teal-500" },
]

function CategoryCard({ name, icon, color }: CategoryProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group cursor-pointer">
      <CardContent className={`p-6 ${color} text-white flex flex-col items-center justify-center h-full`}>
        <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-center group-hover:underline">{name}</h3>
      </CardContent>
    </Card>
  )
}

export default function CategorySection() {
  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          The Prestige Marketplace
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}