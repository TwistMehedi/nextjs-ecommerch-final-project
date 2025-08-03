"use client";

import React, { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import SubMenu from "./SubMenu";
import { Slot } from "@radix-ui/react-slot";

const Menu = () => {
  const [isOpen, setIsOpen] = useState({
    products: false,
    gallery: false,
    category: false
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
                  { title: "Products", url: "/admin/dashboard/allproducts" },
                  { title: "Add Product", url: "/admin/dashboard/add-product" },
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
                  { title: "Add Category", url: "/admin/dashboard/category/add-category" },
                  { title: "All Cagtegory", url: "/admin/dashboard/category/all-category" },
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
              onClick={() => toggleMenu("gallery")}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span>🖼️ Gallery</span>
              {isOpen.gallery ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </Slot>
        </SidebarMenu>

        {isOpen.gallery && (
          <div className="ml-6 mt-1 space-y-1 text-sm">
            <SidebarMenu>
              <SubMenu
                texts={[
                  { title: "Photos", url: "/photos" },
                  { title: "Delete Photo", url: "/delete/photo" },
                ]}
              />
            </SidebarMenu>
          </div>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Menu;
