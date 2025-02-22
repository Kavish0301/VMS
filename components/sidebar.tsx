import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Home,
  LayoutGrid,
  UserCheck,
  Calendar,
  ClipboardList,
  LogOut,
  MessagesSquare,
  FileQuestion,
  FileCheck,
  FileText,
} from "lucide-react"

const routes = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "My Dashboard",
    icon: LayoutGrid,
    href: "/dashboard",
  },
  {
    label: "Vendor Approval",
    icon: UserCheck,
    href: "/vendor-approval",
  },
  {
    label: "RFI",
    icon: Calendar,
    href: "/rfi",
  },
  {
    label: "RFI Approval",
    icon: ClipboardList,
    href: "/rfi-approval",
  },
  {
    label: "RFI Response",
    icon: MessagesSquare,
    href: "/rfi-response",
  },
  {
    label: "RFQ",
    icon: FileQuestion,
    href: "/rfq",
  },
  {
    label: "RFQ Approval",
    icon: FileCheck,
    href: "/rfq-approval",
  },
  {
    label: "RFQ Response",
    icon: FileText,
    href: "/rfq-response",
  },
  {
    label: "Purchase Requisition",
    icon: ClipboardList,
    href: "/purchase-requisition",
  },
]

export function Sidebar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="px-3 py-2">
        <h2 className="text-2xl font-bold">Work Web</h2>
      </div>
      <div className="space-y-1 px-3">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-800 transition",
              route.label === "Purchase Requisition" && "bg-purple-700",
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto px-3">
        <Link
          href="/logout"
          className="text-sm flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-800 transition"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Link>
      </div>
    </div>
  )
}

