"use client"

import { useEffect, useMemo, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, Search, Handshake, User, ShoppingCart } from "lucide-react"

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = useMemo(
    () => [
      { id: "home", icon: Home, label: "Home", path: "/" },
      { id: "shop", icon: Search, label: "Shop", path: "/products" },
      { id: "sell", icon: Handshake, label: "Sell", path: "/sell" },
      { id: "shopping-cart", icon: ShoppingCart, label: "Cart", path: "/cart" },
      { id: "account", icon: User, label: "Account", path: "/profile" },
    ],
    []
  )

  const activeTab = tabs.find((tab) => tab.path === pathname)?.id || "home"

  const handleTabClick = useCallback((path) => {
    router.push(path)
  }, [router])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-100 md:hidden">
      <nav className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeTab === tab.id ? "text-slate-600" : "text-slate-400"
            }`}
            aria-label={tab.label}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            <tab.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
