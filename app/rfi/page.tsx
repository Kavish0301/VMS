"use client"

import { useState } from "react"
import {
  MoreVertical,
  Edit2,
  Eye,
  StopCircle,
  PauseCircle,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"
import { useRFIStore } from "@/lib/store"
import { format } from "date-fns"

export default function RFIPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const rfis = useRFIStore((state) => state.rfis)
  const deleteRFI = useRFIStore((state) => state.deleteRFI)

  const filteredRFIs = rfis.filter(
    (rfi) =>
      rfi.rfiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfi.rfiNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd-MM-yyyy")
    } catch {
      return dateString
    }
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this RFI?")) {
      deleteRFI(id)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Sidebar />

      <div className="ml-[200px] p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-[#6C47FF] text-white px-3 py-1 rounded-md">RFI</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search"
                className="pl-10 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <Link href="/rfi/new">
              <Button variant="outline" className="text-[#6C47FF] border-[#6C47FF]">
                + Add New RFI
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">S.No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">RFI Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">RFI Start Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">RFI End Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Approval</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date Added</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Updated</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRFIs.map((rfi, index) => (
                  <tr key={rfi.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">{rfi.rfiName}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(rfi.startDate)}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(rfi.endDate)}</td>
                    <td className="px-4 py-3 text-sm">{rfi.approval}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(rfi.dateAdded)}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(rfi.lastUpdated)}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{rfi.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit2 className="mr-2" size={14} /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2" size={14} /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <StopCircle className="mr-2" size={14} /> Stop
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PauseCircle className="mr-2" size={14} /> Pause
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(rfi.id)}>
                            <Trash2 className="mr-2" size={14} /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex items-center justify-center gap-1">
            <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft size={16} />
            </Button>
            {[1, 2, 3, 4].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => p + 1)}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

