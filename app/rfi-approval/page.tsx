"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, Edit, Square, Pause, Trash2, MoreVertical } from "lucide-react"
import { DataTable } from "../../components/ui/data-table";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface RFIApproval {
  id: number
  rfiName: string
  organization: string
  startDate: string
  endDate: string
  dateAdded: string
  lastUpdated: string
  status: "Active" | "Close" | "Stopped" | "Paused"
  level: "Pending" | "Approved" | "Declined"
}

export default function RFIApprovalPage() {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedRFI, setSelectedRFI] = useState<RFIApproval | null>(null)
  const [data, setData] = useState<RFIApproval[]>([
    {
      id: 1,
      rfiName: "RFI Demo",
      organization: "Chiku Organization",
      startDate: "12/02/2024",
      endDate: "19/02/2024",
      dateAdded: "10/02/2024",
      lastUpdated: "11/02/2024",
      status: "Active",
      level: "Pending",
    },
  ])

  const handleView = (rfi: RFIApproval) => {
    router.push(`/rfi-approval/${rfi.id}`)
  }

  const handleEdit = (rfi: RFIApproval) => {
    router.push(`/rfi-approval/${rfi.id}/edit`)
  }

  const handleStop = (rfi: RFIApproval) => {
    setData(data.map((item) => (item.id === rfi.id ? { ...item, status: "Stopped" as const } : item)))
  }

  const handlePause = (rfi: RFIApproval) => {
    setData(data.map((item) => (item.id === rfi.id ? { ...item, status: "Paused" as const } : item)))
  }

  const handleDelete = (rfi: RFIApproval) => {
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

  const columns = [
    { accessorKey: "id", header: "S.No" },
    { accessorKey: "rfiName", header: "RFI Name" },
    { accessorKey: "organization", header: "Organization" },
    { accessorKey: "startDate", header: "RFI Start Date" },
    { accessorKey: "endDate", header: "RFI End Date" },
    { accessorKey: "dateAdded", header: "Date Added" },
    { accessorKey: "lastUpdated", header: "Last Updated" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: RFIApproval } }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }: { row: { original: RFIApproval } }) => <StatusBadge status={row.original.level} />,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: RFIApproval } }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => handleView(row.original)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStop(row.original)}>
              <Square className="h-4 w-4 mr-2" />
              Stop
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePause(row.original)}>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original)} className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">RFI Approval</h1>
        <Input type="search" placeholder="Search" className="w-64" />
      </div>
      <DataTable<RFIApproval> columns={columns} data={data} />


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

