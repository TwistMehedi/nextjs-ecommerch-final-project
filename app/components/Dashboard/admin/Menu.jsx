"use client";

import React, { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight, LayoutDashboard} from "lucide-react";
import SubMenu from "./SubMenu";
import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";


const Menu = () => {
  const [isOpen, setIsOpen] = useState({
    products: false,
    gallery: false,
    category: false,
    coupon: false,
    customer: false,
  });

  const toggleMenu = (key) => {
    setIsOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SidebarGroup>

      <SidebarGroupContent>
        <Link
          className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          href="/admin/dashboard"
        >
          <span className="flex gap-1 items-center"> <LayoutDashboard size={16} /> Dashboard</span>
        </Link>
      </SidebarGroupContent>


      <SidebarGroupContent>
        <SidebarMenu asChild>
          <Slot>
            <button
              onClick={() => toggleMenu("products")}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span>🛒 Products</span>
              {isOpen.products ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </Slot>
        </SidebarMenu>

        {isOpen.products && (
          <div className="ml-6 mt-1 space-y-1 text-sm">
            <SidebarMenu>
              <SubMenu
                texts={[
                  {
                    title: "Products",
                    url: "/admin/dashboard/products/allproducts",
                  },
                  {
                    title: "Add Product",
                    url: "/admin/dashboard/products/add-product",
                  },
                ]}
              />
            </SidebarMenu>
          </div>
        )}
      </SidebarGroupContent>

      <SidebarGroupContent>
        <SidebarMenu asChild>
          <Slot>
            <button
              onClick={() => toggleMenu("category")}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span>🛒 Category</span>
              {isOpen.category ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </Slot>
        </SidebarMenu>

        {isOpen.category && (
          <div className="ml-6 mt-1 space-y-1 text-sm">
            <SidebarMenu>
              <SubMenu
                texts={[
                  {
                    title: "Add Category",
                    url: "/admin/dashboard/category/add-category",
                  },
                  {
                    title: "All Cagtegory",
                    url: "/admin/dashboard/category/all-category",
                  },
                ]}
              />
            </SidebarMenu>
          </div>
        )}
      </SidebarGroupContent>

      <SidebarGroupContent>
        <SidebarMenu asChild>
          <Slot>
            <button
              onClick={() => toggleMenu("coupon")}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span>🛒 Coupon</span>
              {isOpen.coupon ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </Slot>
        </SidebarMenu>

        {isOpen.coupon && (
          <div className="ml-6 mt-1 space-y-1 text-sm">
            <SidebarMenu>
              <SubMenu
                texts={[
                  { title: "Add Coupon", url: "/admin/dashboard/coupon/add" },
                  { title: "All Coupon", url: "/admin/dashboard/coupon/all" },
                ]}
              />
            </SidebarMenu>
          </div>
        )}
      </SidebarGroupContent>

      <SidebarGroupContent>
        <SidebarMenu asChild>
          <Slot>
            <button
              onClick={() => toggleMenu("customer")}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span>🛒 Customer</span>
              {isOpen.customer ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </Slot>
        </SidebarMenu>

        {isOpen.customer && (
          <div className="ml-6 mt-1 space-y-1 text-sm">
            <SidebarMenu>
              <SubMenu
                texts={[
                  { title: "Customers", url: "/admin/dashboard/customers" },
                  // { title: "All Coupon", url: "/admin/dashboard/coupon/all" },
                ]}
              />
            </SidebarMenu>
          </div>
        )}
      </SidebarGroupContent>

      <SidebarGroupContent>
        <Link
          className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          href="/admin/dashboard/profile"
        >
          <span>👤 Profile</span>
        </Link>
      </SidebarGroupContent>

      <SidebarGroupContent>
        <Link
          className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          href="/admin/dashboard/orders"
        >
          <span> Orders</span>
        </Link>
      </SidebarGroupContent>



    </SidebarGroup>
  );
};

export default Menu;
