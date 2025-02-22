"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"

interface RFIQualified {
  id: number
  rfiName: string
  startDate: string
  endDate: string
  vendorName: string
  dateAdded: string
  lastUpdated: string
  status: "Active" | "Close"
}

const initialData: RFIQualified[] = [
  {
    id: 1,
    rfiName: "RFI Demo",
    startDate: "12-02-2024 5:30",
    endDate: "19-02-2024 5:30",
    vendorName: "Divya Ojha",
    dateAdded: "10-02-2024 2:30",
    lastUpdated: "11-02-2023 5:30",
    status: "Active",
  },
  {
    id: 2,
    rfiName: "RFI Demo",
    startDate: "12-02-2024 5:30",
    endDate: "19-02-2024 5:30",
    vendorName: "Preet",
    dateAdded: "10-02-2024 2:30",
    lastUpdated: "11-02-2023 5:30",
    status: "Close",
  },
]

export default function RFIQualifiedPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredData = initialData.filter((item) =>
    Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">RFI Qualified</h1>
        <Input
          type="search"
          placeholder="Search"
          className="w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>RFI Name</TableHead>
              <TableHead>RFI Start Date</TableHead>
              <TableHead>RFI End Date</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.rfiName}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.vendorName}</TableCell>
                <TableCell>{row.dateAdded}</TableCell>
                <TableCell>{row.lastUpdated}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

