"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { useSearch } from "@/components/search-provider"
import { SearchProvider } from "@/components/search-provider"

interface RFIResponse {
  id: number
  rfiName: string
  organization: string
  startDate: string
  endDate: string
  vendorsSent: number
  vendorsResponse: number
  dateAdded: string
  lastUpdated: string
  status: "Active" | "Close"
}

const initialData: RFIResponse[] = [
  {
    id: 1,
    rfiName: "RFI Demo",
    organization: "Chiku Organization",
    startDate: "12/02/2024",
    endDate: "22/02/2024",
    vendorsSent: 4,
    vendorsResponse: 2,
    dateAdded: "10/02/2024",
    lastUpdated: "11/02/2024",
    status: "Active",
  },
  {
    id: 2,
    rfiName: "RFI Demo",
    organization: "Chiku Organization",
    startDate: "12/02/2024",
    endDate: "22/02/2024",
    vendorsSent: 6,
    vendorsResponse: 4,
    dateAdded: "10/02/2024",
    lastUpdated: "11/02/2024",
    status: "Close",
  },
]

function RFIResponsePage() {
  const router = useRouter()
  const { searchTerm, setSearchTerm } = useSearch()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredData = initialData.filter((item) =>
    Object.values(item).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const handleView = (id: number) => {
    router.push(`/rfi-response/${id}`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">RFI Response</h1>
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
              <TableHead>Organization</TableHead>
              <TableHead>RFI Start Date</TableHead>
              <TableHead>RFI End Date</TableHead>
              <TableHead>No Of vendor RFI sent</TableHead>
              <TableHead>No Of vendor response</TableHead>
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
                <TableCell>{row.organization}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.vendorsSent}</TableCell>
                <TableCell>{row.vendorsResponse}</TableCell>
                <TableCell>{row.dateAdded}</TableCell>
                <TableCell>{row.lastUpdated}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${row.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleView(row.id)}>
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

export default function RFIResponsePageWrapper() {
  return (
    <SearchProvider>
      <RFIResponsePage />
    </SearchProvider>
  )
}
