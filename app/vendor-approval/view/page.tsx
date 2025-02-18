"use client"

import { ChevronDown, Home, LayoutDashboard, FileText, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VendorDetails() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 text-white p-4 space-y-2 hidden md:block">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Work Web</h1>
        </div>

        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-800 rounded-lg">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-800 rounded-lg">
          <LayoutDashboard className="w-5 h-5" />
          <span>My Dashboard</span>
        </Link>

        <Link href="/vendor-approval" className="flex items-center gap-3 px-3 py-2 bg-purple-600 text-white rounded-lg">
          <FileText className="w-5 h-5" />
          <span>Vendor Approval</span>
        </Link>

        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-800 rounded-lg">
          <FileText className="w-5 h-5" />
          <span>RFI</span>
        </Link>

        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-800 rounded-lg">
          <FileText className="w-5 h-5" />
          <span>RFI Approval</span>
        </Link>

        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-800 rounded-lg">
          <FileText className="w-5 h-5" />
          <span>RFI Response</span>
        </Link>

        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-800 rounded-lg">
          <FileText className="w-5 h-5" />
          <span>RFQ</span>
        </Link>

        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-800 rounded-lg">
          <FileText className="w-5 h-5" />
          <span>RFQ Approval</span>
        </Link>

        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-800 rounded-lg">
          <FileText className="w-5 h-5" />
          <span>RFQ Response</span>
        </Link>

        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-800 rounded-lg">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Vendor Details</h1>
            <Button variant="outline" onClick={() => router.back()}>
              Back to List
            </Button>
          </div>

          {/* Rest of the form sections */}
          {/* Vendor Details Section */}
          <div className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-[#7C3AED] p-4 flex justify-between items-center cursor-pointer">
              <h2 className="text-white font-semibold">Vendor Details</h2>
              <ChevronDown className="text-white h-5 w-5" />
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Vendor Name</Label>
                <Input placeholder="Enter vendor name" />
              </div>
              <div>
                <Label>Contact Person</Label>
                <Input placeholder="Enter contact person name" />
              </div>
              <div>
                <Label>Email Id</Label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label>Vendor Phone no</Label>
                <Input type="tel" placeholder="Enter phone number" />
              </div>
            </div>
          </div>

          {/* Product Portfolio Section */}
          <div className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-[#7C3AED] p-4 flex justify-between items-center cursor-pointer">
              <h2 className="text-white font-semibold">Product Portfolio</h2>
              <ChevronDown className="text-white h-5 w-5" />
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Product</Label>
                <Input placeholder="Enter product name" />
              </div>
              <div>
                <Label>Product Brief</Label>
                <Textarea placeholder="Enter product description" />
              </div>
              <div>
                <Label>Service</Label>
                <Input placeholder="Enter service name" />
              </div>
              <div>
                <Label>Service Brief</Label>
                <Textarea placeholder="Enter service description" />
              </div>
            </div>
          </div>

          {/* Add other sections similarly */}

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9]">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

