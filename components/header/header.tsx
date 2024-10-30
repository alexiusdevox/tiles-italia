'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, ShoppingCart, Heart, User, X, Plus, Minus } from "lucide-react"
import NavMenu from "@/components/header/nav-menu"
import { useWishlistStore } from '@/lib/wishlistStore'
import { useCartStore } from '@/lib/cartStore'

export default function Header() {
    const { items: wishlistItems, removeItem: removeWishlistItem } = useWishlistStore()
    const { items: cartItems, addItem, removeItem, updateQuantity } = useCartStore()

    const wishlistCount = wishlistItems.length
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="bg-black text-white border-b">
                <div className="container py-3">
                    <p className="flex justify-center items-center text-xs">
                        Customer care:
                        <a href="tel:800-000-000" className="pl-2 flex items-center font-bold hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-4 h-4 stroke-white mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            800 000 000
                        </a>
                    </p>
                </div>
            </div>
            <div className="container flex items-center h-16">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <svg width="180" viewBox="0 0 194 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 26.4359L21.5634 13.9301L34.0133 35.5902L12.45 48.0961L0 26.4359Z" fill="#7a7157" />
                        <path d="M15.5376 0.0960693H40.4376V25.1078H15.5376V0.0960693Z" fill="#7a7157" />
                        <path d="M43.5277 48.0961L21.9644 35.5902L34.4143 13.9301L55.9777 26.4359L43.5277 48.0961Z" fill="#7a7157" />
                        <path d="M76.098 39.156C74.7113 39.156 73.6367 38.7833 72.874 38.038C72.1113 37.2927 71.73 36.2267 71.73 34.84V22.204H74.226V34.736C74.226 35.4813 74.408 36.0533 74.772 36.452C75.1533 36.8507 75.6907 37.05 76.384 37.05C77.164 37.05 77.814 36.8333 78.334 36.4L79.114 38.194C78.7327 38.5233 78.2733 38.766 77.736 38.922C77.216 39.078 76.67 39.156 76.098 39.156ZM69.39 27.274V25.22H78.178V27.274H69.39ZM82.1316 39V25.22H84.6276V39H82.1316ZM83.3796 22.568C82.8943 22.568 82.487 22.412 82.1576 22.1C81.8456 21.788 81.6896 21.4067 81.6896 20.956C81.6896 20.488 81.8456 20.098 82.1576 19.786C82.487 19.474 82.8943 19.318 83.3796 19.318C83.865 19.318 84.2636 19.474 84.5756 19.786C84.905 20.0807 85.0696 20.4533 85.0696 20.904C85.0696 21.372 84.9136 21.7707 84.6016 22.1C84.2896 22.412 83.8823 22.568 83.3796 22.568ZM89.3933 39V19.708H91.8893V39H89.3933ZM102.791 39.156C101.318 39.156 100.018 38.8527 98.8911 38.246C97.7817 37.6393 96.9151 36.8073 96.2911 35.75C95.6844 34.6927 95.3811 33.4793 95.3811 32.11C95.3811 30.7407 95.6757 29.5273 96.2651 28.47C96.8717 27.4127 97.6951 26.5893 98.7351 26C99.7924 25.3933 100.98 25.09 102.297 25.09C103.632 25.09 104.81 25.3847 105.833 25.974C106.856 26.5633 107.653 27.3953 108.225 28.47C108.814 29.5273 109.109 30.7667 109.109 32.188C109.109 32.292 109.1 32.4133 109.083 32.552C109.083 32.6907 109.074 32.8207 109.057 32.942H97.3311V31.148H107.757L106.743 31.772C106.76 30.888 106.578 30.0993 106.197 29.406C105.816 28.7127 105.287 28.1753 104.611 27.794C103.952 27.3953 103.181 27.196 102.297 27.196C101.43 27.196 100.659 27.3953 99.9831 27.794C99.3071 28.1753 98.7784 28.7213 98.3971 29.432C98.0157 30.1253 97.8251 30.9227 97.8251 31.824V32.24C97.8251 33.1587 98.0331 33.982 98.4491 34.71C98.8824 35.4207 99.4804 35.9753 100.243 36.374C101.006 36.7727 101.881 36.972 102.869 36.972C103.684 36.972 104.42 36.8333 105.079 36.556C105.755 36.2787 106.344 35.8627 106.847 35.308L108.225 36.92C107.601 37.648 106.821 38.2027 105.885 38.584C104.966 38.9653 103.935 39.156 102.791 39.156ZM116.527 39.156C115.383 39.156 114.291 39 113.251 38.688C112.228 38.376 111.422 37.9947 110.833 37.544L111.873 35.568C112.462 35.9667 113.19 36.3047 114.057 36.582C114.924 36.8593 115.808 36.998 116.709 36.998C117.87 36.998 118.702 36.8333 119.205 36.504C119.725 36.1747 119.985 35.7153 119.985 35.126C119.985 34.6927 119.829 34.3547 119.517 34.112C119.205 33.8693 118.789 33.6873 118.269 33.566C117.766 33.4447 117.203 33.3407 116.579 33.254C115.955 33.15 115.331 33.0287 114.707 32.89C114.083 32.734 113.511 32.526 112.991 32.266C112.471 31.9887 112.055 31.616 111.743 31.148C111.431 30.6627 111.275 30.0213 111.275 29.224C111.275 28.392 111.509 27.664 111.977 27.04C112.445 26.416 113.104 25.9393 113.953 25.61C114.82 25.2633 115.842 25.09 117.021 25.09C117.922 25.09 118.832 25.2027 119.751 25.428C120.687 25.636 121.45 25.9393 122.039 26.338L120.973 28.314C120.349 27.898 119.699 27.612 119.023 27.456C118.347 27.3 117.671 27.222 116.995 27.222C115.903 27.222 115.088 27.404 114.551 27.768C114.014 28.1147 113.745 28.5653 113.745 29.12C113.745 29.588 113.901 29.952 114.213 30.212C114.542 30.4547 114.958 30.6453 115.461 30.784C115.981 30.9227 116.553 31.044 117.177 31.148C117.801 31.2347 118.425 31.356 119.049 31.512C119.673 31.6507 120.236 31.85 120.739 32.11C121.259 32.37 121.675 32.734 121.987 33.202C122.316 33.67 122.481 34.294 122.481 35.074C122.481 35.906 122.238 36.6253 121.753 37.232C121.268 37.8387 120.583 38.3153 119.699 38.662C118.815 38.9913 117.758 39.156 116.527 39.156ZM132.583 39V25.22H135.079V39H132.583ZM133.831 22.568C133.345 22.568 132.938 22.412 132.609 22.1C132.297 21.788 132.141 21.4067 132.141 20.956C132.141 20.488 132.297 20.098 132.609 19.786C132.938 19.474 133.345 19.318 133.831 19.318C134.316 19.318 134.715 19.474 135.027 19.786C135.356 20.0807 135.521 20.4533 135.521 20.904C135.521 21.372 135.365 21.7707 135.053 22.1C134.741 22.412 134.333 22.568 133.831 22.568ZM144.577 39.156C143.19 39.156 142.115 38.7833 141.353 38.038C140.59 37.2927 140.209 36.2267 140.209 34.84V22.204H142.705V34.736C142.705 35.4813 142.887 36.0533 143.251 36.452C143.632 36.8507 144.169 37.05 144.863 37.05C145.643 37.05 146.293 36.8333 146.813 36.4L147.593 38.194C147.211 38.5233 146.752 38.766 146.215 38.922C145.695 39.078 145.149 39.156 144.577 39.156ZM137.869 27.274V25.22H146.657V27.274H137.869ZM159.164 39V36.088L159.034 35.542V30.576C159.034 29.5187 158.722 28.704 158.098 28.132C157.491 27.5427 156.573 27.248 155.342 27.248C154.527 27.248 153.73 27.3867 152.95 27.664C152.17 27.924 151.511 28.2793 150.974 28.73L149.934 26.858C150.645 26.286 151.494 25.8527 152.482 25.558C153.487 25.246 154.536 25.09 155.628 25.09C157.517 25.09 158.973 25.5493 159.996 26.468C161.019 27.3867 161.53 28.7907 161.53 30.68V39H159.164ZM154.64 39.156C153.617 39.156 152.716 38.9827 151.936 38.636C151.173 38.2893 150.584 37.8127 150.168 37.206C149.752 36.582 149.544 35.88 149.544 35.1C149.544 34.3547 149.717 33.6787 150.064 33.072C150.428 32.4653 151.009 31.98 151.806 31.616C152.621 31.252 153.713 31.07 155.082 31.07H159.45V32.864H155.186C153.938 32.864 153.097 33.072 152.664 33.488C152.231 33.904 152.014 34.4067 152.014 34.996C152.014 35.672 152.283 36.218 152.82 36.634C153.357 37.0327 154.103 37.232 155.056 37.232C155.992 37.232 156.807 37.024 157.5 36.608C158.211 36.192 158.722 35.5853 159.034 34.788L159.528 36.504C159.199 37.3187 158.618 37.9687 157.786 38.454C156.954 38.922 155.905 39.156 154.64 39.156ZM166.149 39V19.708H168.645V39H166.149ZM173.411 39V25.22H175.907V39H173.411ZM174.659 22.568C174.174 22.568 173.766 22.412 173.437 22.1C173.125 21.788 172.969 21.4067 172.969 20.956C172.969 20.488 173.125 20.098 173.437 19.786C173.766 19.474 174.174 19.318 174.659 19.318C175.144 19.318 175.543 19.474 175.855 19.786C176.184 20.0807 176.349 20.4533 176.349 20.904C176.349 21.372 176.193 21.7707 175.881 22.1C175.569 22.412 175.162 22.568 174.659 22.568ZM189.227 39V36.088L189.097 35.542V30.576C189.097 29.5187 188.785 28.704 188.161 28.132C187.554 27.5427 186.635 27.248 185.405 27.248C184.59 27.248 183.793 27.3867 183.013 27.664C182.233 27.924 181.574 28.2793 181.037 28.73L179.997 26.858C180.707 26.286 181.557 25.8527 182.545 25.558C183.55 25.246 184.599 25.09 185.691 25.09C187.58 25.09 189.036 25.5493 190.059 26.468C191.081 27.3867 191.593 28.7907 191.593 30.68V39H189.227ZM184.703 39.156C183.68 39.156 182.779 38.9827 181.999 38.636C181.236 38.2893 180.647 37.8127 180.231 37.206C179.815 36.582 179.607 35.88 179.607 35.1C179.607 34.3547 179.78 33.6787 180.127 33.072C180.491 32.4653 181.071 31.98 181.869 31.616C182.683 31.252 183.775 31.07 185.145 31.07H189.513V32.864H185.249C184.001 32.864 183.16 33.072 182.727 33.488C182.293 33.904 182.077 34.4067 182.077 34.996C182.077 35.672 182.345 36.218 182.883 36.634C183.42 37.0327 184.165 37.232 185.119 37.232C186.055 37.232 186.869 37.024 187.563 36.608C188.273 36.192 188.785 35.5853 189.097 34.788L189.591 36.504C189.261 37.3187 188.681 37.9687 187.849 38.454C187.017 38.922 185.968 39.156 184.703 39.156Z" fill="black" />
                    </svg>
                </Link>
                <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
                    <form className="w-full">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                            <Input
                                type="search"
                                placeholder="Search"
                                className="pl-8 w-full"
                            />
                        </div>
                    </form>
                    <HeaderIconButton
                        icon={<User className="h-6 w-6" strokeWidth={1.5} />}
                        label="Account"
                        popoverContent={<Link href="/signin" className="text-sm">Sign in</Link>}
                    />
                    <HeaderIconButton
                        icon={<Heart className="h-6 w-6" strokeWidth={1.5} />}
                        label="Wishlist"
                        count={wishlistCount}
                        popoverContent={
                            <WishlistPopoverContent
                                items={wishlistItems}
                                removeItem={removeWishlistItem}
                            />
                        }
                    />
                    <HeaderIconButton
                        icon={<ShoppingCart className="h-6 w-6" strokeWidth={1.5} />}
                        label="Cart"
                        count={cartCount}
                        popoverContent={
                            <CartPopoverContent
                                items={cartItems}
                                total={cartTotal}
                                addItem={addItem}
                                removeItem={removeItem}
                                updateQuantity={updateQuantity}
                            />
                        }
                    />
                </div>
            </div>
            <div className="container flex items-center h-16">
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <NavMenu />
                </nav>
                <form className="w-full flex-1 md:w-auto md:flex-none flex md:hidden">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground bg-transparent" strokeWidth={1.5} />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 w-full"
                        />
                    </div>
                </form>
            </div>
        </header>
    )
}

function HeaderIconButton({ icon, label, count, popoverContent }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <Popover>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                {icon}
                                <span className="sr-only">{label}</span>
                                {count > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2 bg-red-500 flex items-center justify-center"
                                    >
                                        {count}
                                    </Badge>
                                )}
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <PopoverContent className="w-80">
                        {popoverContent}
                    </PopoverContent>
                </Popover>
                <TooltipContent>
                    <span>{label}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

function WishlistPopoverContent({ items, removeItem }) {
    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Your Wishlist</h4>
                <p className="text-sm text-muted-foreground">
                    {items.length} item{items.length !== 1 ? 's' : ''} in your wishlist
                </p>
            </div>
            <ul className="grid gap-2">
                {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={30}
                                height={30}
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove {item.name} from wishlist</span>
                        </Button>
                    </li>
                ))}
            </ul>
            {items.length > 0 && (
                <Button className="w-full">View Wishlist</Button>
            )}
        </div>
    )
}

function CartPopoverContent({ items, total, addItem, removeItem, updateQuantity }) {
    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Your Cart</h4>
                <p className="text-sm text-muted-foreground">
                    {items.length} item{items.length !== 1 ? 's' : ''} in your cart
                </p>
            </div>
            <ul className="grid gap-2">
                {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={30}
                                height={30}
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)}
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove {item.name} from cart</span>
                        </Button>
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Total:</p>
                <p className="text-sm font-medium">${total.toFixed(2)}</p>
            </div>
            {items.length > 0 && (
                <Button className="w-full">Checkout</Button>
            )}
        </div>
    )
}