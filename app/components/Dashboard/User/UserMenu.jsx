"use client";

import React from "react";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import Link from "next/link";

const UserMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <Link
          href={"/user/dashboard"}
          className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Dashboard
        </Link>
      </SidebarGroupContent>

      <SidebarGroupContent>
        <Link
          href={"/user/dashboard/profile"}
          className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Profile
        </Link>
      </SidebarGroupContent>

      <SidebarGroupContent>
        <Link
          href={"/user/dashboard/orders"}
          className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Orders
        </Link>
      </SidebarGroupContent>

      <SidebarGroupContent>
        <Link
          href={"/user/dashboard/cart"}
          className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Cart
        </Link>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default UserMenu;
