"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface Vendor {
  id: string
  name: string
  isQualified: boolean
  vendorId?: string
}

interface Activity {
  id: string
  requirement: string
  value: string
  attachment: boolean
  file?: File | null
}

interface VendorActivity extends Activity {
  value: string
}

export default function RFIResponseView() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const [formData, setFormData] = useState({
    rfiNumber: "RFI Number 1",
    regarding: "Laptop",
    startDateTime: "12/02/2024 5:30",
    endDateTime: "22/02/2024 5:30",
    responsiblePerson: "Divya Ojha",
    email: "qwer123@gmail.com",
    phone: "1234567809",
    responseTime: "10 Days",
    remark: "Responsible Person Name",
    rfiDetails: "",
  })

  const [vendors, setVendors] = useState<Vendor[]>([
    { id: "1", name: "Divya Ojha", vendorId: "Vend0123", isQualified: true },
    { id: "2", name: "Divya Ojha", isQualified: false },
    { id: "3", name: "Divya Ojha", isQualified: false },
    { id: "4", name: "Divya Ojha", isQualified: false },
  ])

  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", requirement: "Laptop", value: "", attachment: true, file: null },
    { id: "2", requirement: "Mac Laptop", value: "", attachment: true, file: null },
  ])

  const [vendorActivities] = useState<VendorActivity[]>([
    { id: "1", requirement: "Laptop", value: "12", attachment: true },
    { id: "2", requirement: "Mac Laptop", value: "10", attachment: true },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (activityId: string) => {
    const fileInput = fileInputRefs.current[activityId]
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleFileChange = (activityId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setActivities((prevActivities) =>
        prevActivities.map((activity) => (activity.id === activityId ? { ...activity, file } : activity)),
      )
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      })
    }
  }

  const handleVendorQualification = (vendorId: string) => {
    setVendors(
      vendors.map((vendor) => (vendor.id === vendorId ? { ...vendor, isQualified: !vendor.isQualified } : vendor)),
    )
  }

  const qualifySelectedVendors = () => {
    const qualifiedCount = vendors.filter((v) => v.isQualified).length
    setVendors(vendors.map((vendor) => ({ ...vendor, isQualified: vendor.isQualified })))
    toast({
      title: "Vendors Qualified",
      description: `${qualifiedCount} vendor(s) have been qualified successfully.`,
    })
  }

  const qualifyAllVendors = () => {
    setVendors(vendors.map((vendor) => ({ ...vendor, isQualified: true })))
    toast({
      title: "All Vendors Qualified",
      description: `All ${vendors.length} vendors have been qualified successfully.`,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate attachments
    const missingAttachments = activities.filter((activity) => activity.attachment && !activity.file)
    if (missingAttachments.length > 0) {
      toast({
        title: "Missing Attachments",
        description: "Please upload all required attachments before submitting.",
        variant: "destructive",
      })
      return
    }

    // Validate vendor qualification
    if (!vendors.some((vendor) => vendor.isQualified)) {
      toast({
        title: "No Vendors Qualified",
        description: "Please qualify at least one vendor before submitting.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "RFI Submitted",
      description: "Your RFI response has been submitted successfully.",
    })

    // Delay navigation to show the success toast
    setTimeout(() => {
      router.push("/rfi-response")
    }, 2000)
  }

  const handleSave = () => {
    toast({
      title: "RFI Saved",
      description: "Your RFI response has been saved as draft.",
    })
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>RFI Response</span>
        <span>/</span>
        <span>View</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields section */}
        <div className="border rounded-lg p-6 space-y-6">
          {/* Existing form fields */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            <div className="space-y-2">
              <Label>RFI Number</Label>
              <Input value={formData.rfiNumber} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Regarding</Label>
              <Input value={formData.regarding} readOnly />
            </div>
            <div className="space-y-2">
              <Label>RFI Start Date & time</Label>
              <Input value={formData.startDateTime} readOnly />
            </div>
            <div className="space-y-2">
              <Label>RFI End Date & time</Label>
              <Input value={formData.endDateTime} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Responsible Person Name</Label>
              <Input value={formData.responsiblePerson} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Responsible Person Email</Label>
              <Input value={formData.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Responsible Person Phone</Label>
              <Input value={formData.phone} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Response Time</Label>
              <Input value={formData.responseTime} readOnly />
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
            <Label>Remark</Label>
            <Input name="remark" value={formData.remark} onChange={handleInputChange} />
          </div>
        </div>

        {/* RFI Activity List section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">Add RFI Activity List</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Requirement</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Attachment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow key={activity.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{activity.requirement}</TableCell>
                  <TableCell>{activity.value}</TableCell>
                  <TableCell>
                    {activity.attachment && (
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          className="hidden"
                          // ref={(el) => (fileInputRefs.current[activity.id] = el)} // Corrected ref usage
                          onChange={(e) => handleFileChange(activity.id, e)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleFileUpload(activity.id)}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {activity.file ? activity.file.name : "Upload"}
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Vendor Activity List section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">RFI Filling Activity List By Vendor</h2>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Vendor List</Label>
              {vendors
                .filter((vendor) => vendor.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((vendor) => (
                  <div key={vendor.id} className="flex items-center gap-2 p-2">
                    <Checkbox
                      checked={vendor.isQualified}
                      onCheckedChange={() => handleVendorQualification(vendor.id)}
                    />
                    <span>{vendor.name}</span>
                    {vendor.vendorId && <span className="text-sm text-gray-500">({vendor.vendorId})</span>}
                    <div className="text-sm">Is RFI Qualified</div>
                  </div>
                ))}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Requirements</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Attachment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorActivities.map((activity, index) => (
                  <TableRow key={activity.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{activity.requirement}</TableCell>
                    <TableCell>{activity.value}</TableCell>
                    <TableCell>{activity.attachment && <div className="w-4 h-4">📎</div>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-center gap-4">
              <Button type="button" variant="outline" onClick={qualifySelectedVendors}>
                Make RFI Qualified to selected Vendor
              </Button>
              <Button type="button" variant="outline" onClick={qualifyAllVendors}>
                Make RFI Qualified to All Vendor
              </Button>
            </div>
          </div>
        </div>

        {/* RFI Details section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">RFI Details</h2>
          <Textarea
            name="rfiDetails"
            value={formData.rfiDetails}
            onChange={handleInputChange}
            placeholder="Enter RFI details here"
            className="min-h-[100px]"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/rfi-response")}>
            Back
          </Button>
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>

      <Toaster />
    </div>
  )
}

