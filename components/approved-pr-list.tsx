"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Eye, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ApprovedPR {
  id: number
  prNo: string
  requestedBy: string
  items: string
  shipLocation: string
  prDate: string
  prApproved: string
  level: string
  status: "Approved" | "Pending"
}

const mockData: ApprovedPR[] = [
  {
    id: 1,
    prNo: "001",
    requestedBy: "Divya Ojha",
    items: "Laptop",
    shipLocation: "Gurugram",
    prDate: "12-03-2024",
    prApproved: "Lorem",
    level: "1",
    status: "Approved",
  },
  {
    id: 2,
    prNo: "002",
    requestedBy: "Divya Ojha",
    items: "Laptop",
    shipLocation: "Gurugram",
    prDate: "12-03-2024",
    prApproved: "Lorem",
    level: "1",
    status: "Approved",
  },
]

export function ApprovedPRList() {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const itemsPerPage = 10

  const filteredData = mockData.filter(
    (pr) =>
      pr.prNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.items.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const toggleSelectAll = () => {
    if (selectedItems.length === currentData.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(currentData.map((item) => item.id))
    }
  }

  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleViewDetails = (prNo: string) => {
    router.push(`/purchase-requisition/view/${prNo}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          type="search"
          placeholder="Search PR..."
          className="w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox checked={selectedItems.length === currentData.length} onCheckedChange={toggleSelectAll} />
              </TableHead>
              <TableHead>S.No</TableHead>
              <TableHead>PR No.</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Ship Location</TableHead>
              <TableHead>PR Date</TableHead>
              <TableHead>PR Approved 1</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((pr) => (
              <TableRow key={pr.id}>
                <TableCell>
                  <Checkbox checked={selectedItems.includes(pr.id)} onCheckedChange={() => toggleSelectItem(pr.id)} />
                </TableCell>
                <TableCell>{pr.id}</TableCell>
                <TableCell>{pr.prNo}</TableCell>
                <TableCell>{pr.requestedBy}</TableCell>
                <TableCell>{pr.items}</TableCell>
                <TableCell>{pr.shipLocation}</TableCell>
                <TableCell>{pr.prDate}</TableCell>
                <TableCell>{pr.prApproved}</TableCell>
                <TableCell>{pr.level}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-500 text-white hover:bg-orange-600">
                      {pr.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent"
                      onClick={() => handleViewDetails(pr.prNo)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-transparent">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(pr.prNo)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "bg-purple-600 text-white hover:bg-purple-700" : ""}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

