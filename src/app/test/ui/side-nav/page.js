"use client";
import { useState } from "react";

export default function SidebarLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div
        className={`bg-gray-200 text-white transition-all duration-300 quad-in
        ${collapsed ? "w-20" : "w-50"} p-4`} onMouseEnter={()=>setCollapsed(false)} onMouseLeave={() => setCollapsed(true)}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6 bg-gray-300 px-2 py-1 rounded"
        >
          {collapsed ? ">>" : "<<"}
        </button>

        {/* Menu Items */}
        <ul className="space-y-1">
          <li className="flex items-center gap-3 hover:bg-gray-300 p-2 rounded cursor-pointer">
            <span>#</span>
            {!collapsed && <span>Dashboard</span>}
          </li>

          <li className="flex items-center gap-3 hover:bg-gray-300 p-2 rounded cursor-pointer">
            <span>O</span>
            {!collapsed && <span>Projects</span>}
          </li>

          <li className="flex items-center gap-3 hover:bg-gray-300 p-2 rounded cursor-pointer">
            <span>&</span>
            {!collapsed && <span>Settings</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-thin">Main Content</h1>
      </div>
    </div>
  );
}