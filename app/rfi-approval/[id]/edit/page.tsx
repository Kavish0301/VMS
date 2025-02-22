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
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"

interface ActivityType {
  id: string
  requirement: string
  value: string
  mandatory: boolean
  attachment: boolean
}

export default function RFIApprovalEdit() {
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

  const [activities, setActivities] = useState<ActivityType[]>([
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

  const handleActivityChange = (id: string, field: keyof ActivityType, value: any) => {
    setActivities((prev) => prev.map((activity) => (activity.id === id ? { ...activity, [field]: value } : activity)))
  }

  const addActivity = () => {
    const newActivity: ActivityType = {
      id: `${activities.length + 1}`,
      requirement: "",
      value: "",
      mandatory: false,
      attachment: false,
    }
    setActivities((prev) => [...prev, newActivity])
  }

  const removeActivity = (id: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    toast({
      title: "RFI Updated",
      description: "The RFI has been successfully updated.",
    })
    router.push("/rfi-approval")
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>RFI Approval</span>
        <span>/</span>
        <span>Edit</span>
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
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">RFI Activity List</h2>
          <Button type="button" onClick={addActivity} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Requirement</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Mandatory</TableHead>
              <TableHead>Attachment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Input
                    value={activity.requirement}
                    onChange={(e) => handleActivityChange(activity.id, "requirement", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={activity.value}
                    onChange={(e) => handleActivityChange(activity.id, "value", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={activity.mandatory}
                    onCheckedChange={(checked) => handleActivityChange(activity.id, "mandatory", checked)}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={activity.attachment}
                    onCheckedChange={(checked) => handleActivityChange(activity.id, "attachment", checked)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeActivity(activity.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
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

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/rfi-approval")}>
          Back
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}

