import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";  
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-100 shadow">
      <Link href="/" className="text-lg font-bold">
        MyLogo
      </Link>

      <div className="flex items-center gap-4">
        {/* Cart link with icon */}
        <Link href="/user/dashboard/cart" className="flex items-center gap-1 hover:underline">
          <ShoppingCart className="w-5 h-5" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link href="/user/dashboard" variant="outline">Dashboard</Link>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/user/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/user/dashboard/orders">Orders</Link>
            </DropdownMenuItem>
          </DropdownMenuContent> */}
        </DropdownMenu>
      </div>
    </nav>
  );
}
