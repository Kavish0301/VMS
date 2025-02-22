"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, Edit, Square, Pause, Trash2, Plus, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface RFI {
  id: number
  rfiName: string
  organization: string
  startDate: string
  endDate: string
  dateAdded: string
  lastUpdated: string
  status: "Active" | "Close" | "Stopped" | "Paused"
}

const initialData: RFI[] = [
  {
    id: 1,
    rfiName: "RFI Demo",
    organization: "Chiku Organization",
    startDate: "12/02/2024",
    endDate: "19/02/2024",
    dateAdded: "10/02/2024",
    lastUpdated: "11/02/2024",
    status: "Active",
  },
  {
    id: 2,
    rfiName: "RFI Demo 2",
    organization: "Tech Solutions",
    startDate: "15/02/2024",
    endDate: "22/02/2024",
    dateAdded: "14/02/2024",
    lastUpdated: "14/02/2024",
    status: "Active",
  },
]

export default function RFIPage() {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedRFI, setSelectedRFI] = useState<RFI | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState(initialData)

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleView = (rfi: RFI) => {
    router.push(`/rfi/${rfi.id}`)
  }

  const handleEdit = (rfi: RFI) => {
    router.push(`/rfi/${rfi.id}/edit`)
  }

  const handleStop = (rfi: RFI) => {
    setData(data.map((item) => (item.id === rfi.id ? { ...item, status: "Stopped" as const } : item)))
  }

  const handlePause = (rfi: RFI) => {
    setData(data.map((item) => (item.id === rfi.id ? { ...item, status: "Paused" as const } : item)))
  }

  const handleDelete = (rfi: RFI) => {
    setSelectedRFI(rfi)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (selectedRFI) {
      setData(data.filter((item) => item.id !== selectedRFI.id))
      setShowDeleteDialog(false)
      setSelectedRFI(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">RFI Management</h1>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Search"
            className="w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => router.push("/rfi/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Create New RFI
          </Button>
        </div>
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
              <TableHead>Date Added</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((rfi) => (
              <TableRow key={rfi.id}>
                <TableCell>{rfi.id}</TableCell>
                <TableCell>{rfi.rfiName}</TableCell>
                <TableCell>{rfi.organization}</TableCell>
                <TableCell>{rfi.startDate}</TableCell>
                <TableCell>{rfi.endDate}</TableCell>
                <TableCell>{rfi.dateAdded}</TableCell>
                <TableCell>{rfi.lastUpdated}</TableCell>
                <TableCell>
                  <StatusBadge status={rfi.status} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleView(rfi)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(rfi)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStop(rfi)}>
                        <Square className="h-4 w-4 mr-2" />
                        Stop
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePause(rfi)}>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(rfi)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the RFI and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

