"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Wood",
    href: "http://localhost:3000/products?effect=Wood",
    description:
      "Porcelain tiles that replicate the warmth and texture of natural wood, offering durability and easy maintenance.",
  },
  {
    title: "Marble",
    href: "http://localhost:3000/products?effect=Marble",
    description:
      "Elegant marble-look tiles, combining the luxury of marble with the strength and low porosity of porcelain.",
  },
  {
    title: "Stone",
    href: "http://localhost:3000/products?effect=Stone",
    description:
      "Stone-effect tiles that mimic the raw beauty and texture of real stone, perfect for a natural look.",
  }
]

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Collections</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-[#eee2b7] from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="http://localhost:3000/products"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      All collections
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Explore all porcelain stoneware tile options by type, finish, and design.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={`bg-transparent ${navigationMenuTriggerStyle()}`}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink className={`bg-transparent ${navigationMenuTriggerStyle()}`}
            >
              Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/assistance" legacyBehavior passHref>
            <NavigationMenuLink className={`bg-transparent ${navigationMenuTriggerStyle()}`}
            >
              Assistance
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
