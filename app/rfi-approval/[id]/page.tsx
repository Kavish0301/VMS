"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { useToast } from "@/components/ui/use-toast"

interface ActivityType {
  id: string
  requirement: string
  value: string
  mandatory: boolean
  attachment: boolean
}

export default function RFIApprovalView() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    rfiNumber: "RFI Number 1",
    regarding: "Laptop",
    startDateTime: new Date("2024-02-12T05:30:00"),
    endDateTime: new Date("2024-02-22T05:30:00"),
    responsiblePerson: "Divya Ojha",
    email: "qwer123@gmail.com",
    phone: "1234567809",
    responseTime: "10 Days",
    remark: "",
    rfiDetails: "",
  })

  const vendors = [
    { id: "1", name: "Divya Ojha" },
    { id: "2", name: "Preet Singh" },
    { id: "3", name: "Rahul Sharma" },
    { id: "4", name: "Anita Patel" },
  ]

  const [activities] = useState<ActivityType[]>([
    {
      id: "1",
      requirement: "Laptop",
      value: "Number",
      mandatory: true,
      attachment: true,
    },
    {
      id: "2",
      requirement: "Mac Laptop",
      value: "Number",
      mandatory: true,
      attachment: false,
    },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined, field: string) => {
    if (date) {
      setFormData((prev) => ({ ...prev, [field]: date }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    toast({
      title: "RFI Saved",
      description: "The RFI has been successfully saved.",
    })
  }

  const handleClose = () => {
    toast({
      title: "RFI Closed",
      description: "The RFI has been closed.",
    })
    router.push("/rfi-approval")
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>RFI Approval</span>
        <span>/</span>
        <span>View</span>
      </div>

      {/* Main Info Section */}
      <div className="border rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="rfiNumber">RFI Number</Label>
            <Input id="rfiNumber" name="rfiNumber" value={formData.rfiNumber} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="regarding">Regarding</Label>
            <Input id="regarding" name="regarding" value={formData.regarding} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label>RFI Start Date & time</Label>
            <DateTimePicker date={formData.startDateTime} setDate={(date) => handleDateChange(date, "startDateTime")} />
          </div>
          <div className="space-y-2">
            <Label>RFI End Date & time</Label>
            <DateTimePicker date={formData.endDateTime} setDate={(date) => handleDateChange(date, "endDateTime")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsiblePerson">Responsible Person Name</Label>
            <Input
              id="responsiblePerson"
              name="responsiblePerson"
              value={formData.responsiblePerson}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Responsible Person Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Responsible Person Phone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responseTime">Response Time</Label>
            <Input id="responseTime" name="responseTime" value={formData.responseTime} onChange={handleInputChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Vendor List</Label>
          <div className="space-y-1">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black"></div>
                <span>{vendor.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="remark">Remark</Label>
          <Textarea
            id="remark"
            name="remark"
            value={formData.remark}
            onChange={handleInputChange}
            placeholder="Enter your remarks here"
          />
        </div>
      </div>

      {/* RFI Activity List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-center">Add RFI Activity List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Requirement</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Mandatory</TableHead>
              <TableHead>Attachment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{activity.requirement}</TableCell>
                <TableCell>{activity.value}</TableCell>
                <TableCell>{activity.mandatory ? "Yes" : "No"}</TableCell>
                <TableCell>{activity.attachment ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* RFI Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">RFI Details</h2>
        <div className="space-y-2">
          <Label htmlFor="rfiDetails">Details</Label>
          <Textarea
            id="rfiDetails"
            name="rfiDetails"
            value={formData.rfiDetails}
            onChange={handleInputChange}
            placeholder="Enter RFI details here"
          />
        </div>
      </div>

      {/* RFI Approval */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">RFI Approval</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-medium">RFI Number 1</div>
              <div>:- Approved By Divya Ojha</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-medium">Requested Date & Time</div>
              <div>:- {formData.startDateTime.toLocaleString()}</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Approval Date & Time</div>
              <div>:- {new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/rfi-approval")}>
          Back
        </Button>
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={handleClose}>
          Close
        </Button>
      </div>
    </form>
  )
}

