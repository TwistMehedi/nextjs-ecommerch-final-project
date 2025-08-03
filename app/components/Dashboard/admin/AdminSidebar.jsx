"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar";

import { useState } from "react";
import Menu from "./Menu";
import Link from "next/link";

const AdminSidebar = () => {

  return (
    <Sidebar className="w-64 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white border-r dark:border-gray-700">
      <SidebarHeader className="text-xl font-bold px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <Link href={"/admin/dashboard"}>Admin Panel</Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <Menu />
      </SidebarContent>

      <SidebarFooter className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        &copy; 2025 Admin
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
