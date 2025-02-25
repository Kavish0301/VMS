import type React from "react"
import Link from "next/link"
import {
  HomeIcon,
  LayoutDashboardIcon,
  UserCheckIcon,
  FileTextIcon,
  CheckSquareIcon,
  MessageSquareIcon,
  HelpCircleIcon,
  LogOutIcon,
} from "lucide-react"

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-[252px] bg-[#1C1C1C] text-white">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-serif">Work Web</h1>
      </div>

      <nav className="p-2">
        <SidebarLink href="/" icon={<HomeIcon size={18} />} label="Home" />
        <SidebarLink href="/dashboard" icon={<LayoutDashboardIcon size={18} />} label="My Dashboard" />
        <SidebarLink href="/vendor-approval" icon={<UserCheckIcon size={18} />} label="Vendor Approval" />
        <SidebarLink href="/rfi" icon={<FileTextIcon size={18} />} label="RFI" isActive />
        <SidebarLink href="/rfi-approval" icon={<CheckSquareIcon size={18} />} label="RFI Approval" />
        <SidebarLink href="/rfi-response" icon={<MessageSquareIcon size={18} />} label="RFI Response" />
        <SidebarLink href="/purchase-requisition" icon={<HelpCircleIcon size={18} />} label="Purchase Requisition" />

        <SidebarLink href="/logout" icon={<LogOutIcon size={18} />} label="Log out" />
      </nav>
    </div>
  )
}

function SidebarLink({
  href,
  icon,
  label,
  isActive,
}: { href: string; icon: React.ReactNode; label: string; isActive?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 hover:bg-[#6C47FF] rounded-lg text-sm ${isActive ? " text-white" : "text-gray-300 hover:bg-gray-800"
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

