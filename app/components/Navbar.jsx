"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useProduct } from "@/contexts/useContext";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { product } = useProduct();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  return (
    <nav className="bg-gray-100 shadow px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          MyLogo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/user/dashboard/cart"
            className="flex items-center gap-1 hover:underline"
          >
            {product.length}
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {user?.role === "admin" ? (
            <Link
              href="/admin/dashboard"
              className="px-3 py-1 border rounded hover:bg-gray-200"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/user/dashboard"
              className="px-3 py-1 border rounded hover:bg-gray-200"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 bg-white p-4 rounded-lg shadow">
          <Link
            href="/user/dashboard/cart"
            className="flex items-center gap-1 hover:underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            {product.length} <ShoppingCart className="w-5 h-5" />
          </Link>

          {user?.role === "admin" ? (
            <Link
              href="/admin/dashboard"
              className="px-3 py-2 border rounded hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/user/dashboard"
              className="px-3 py-2 border rounded hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
