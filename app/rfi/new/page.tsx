"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRFIStore } from "@/lib/store"
import type { RFI, Activity } from "@/lib/types"

export default function NewRFIPage() {
  const router = useRouter()
  const addRFI = useRFIStore((state) => state.addRFI)

  const [formData, setFormData] = useState({
    rfiNumber: "",
    regarding: "",
    startDate: "",
    endDate: "",
    responsiblePerson: {
      name: "",
      email: "",
      phone: "",
    },
    responseTime: "",
    vendor: "",
    approval: "Pending",
    remark: "",
    details: "",
  })

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, requirements: "Laptop", value: "Number", isMandatory: true, isAttachment: true },
  ])

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".") as [keyof typeof formData, string]

      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent] as Record<string, any>), // ✅ Explicitly cast as object
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const addActivity = () => {
    const newId = activities.length + 1
    setActivities([
      ...activities,
      {
        id: newId,
        requirements: "",
        value: "",
        isMandatory: false,
        isAttachment: false,
      },
    ])
  }

  const handleSave = () => {
    const currentDate = new Date().toISOString()

    const newRFI: RFI = {
      id: Date.now(),
      rfiNumber: formData.rfiNumber,
      rfiName: formData.regarding,
      startDate: formData.startDate,
      endDate: formData.endDate,
      approval: formData.approval,
      dateAdded: currentDate,
      lastUpdated: currentDate,
      status: "Active",
      responsiblePerson: formData.responsiblePerson,
      activities: activities,
    }

    addRFI(newRFI)
    router.push("/rfi")
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-white shadow-lg">
        <Sidebar />
      </div>

      <div className="ml-[50px] p-6 " style={{ width: "85vw" }}>
        <div className="mb-6">
          <div className="text-sm text-gray-600">RFI {">"} Add RFI</div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">RFI Number</label>
                <Input value={formData.rfiNumber} onChange={(e) => handleInputChange("rfiNumber", e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Regarding</label>
                <Input value={formData.regarding} onChange={(e) => handleInputChange("regarding", e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">RFI Start Date & time</label>
                <Input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">RFI End Date & time</label>
                <Input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Responsible Person Name</label>
                <Input
                  value={formData.responsiblePerson.name}
                  onChange={(e) => handleInputChange("responsiblePerson.name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Responsible Person Email</label>
                <Input
                  type="email"
                  value={formData.responsiblePerson.email}
                  onChange={(e) => handleInputChange("responsiblePerson.email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Responsible Person Phone</label>
                <Input
                  type="tel"
                  value={formData.responsiblePerson.phone}
                  onChange={(e) => handleInputChange("responsiblePerson.phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Response Time</label>
                <Select
                  value={formData.responseTime}
                  onValueChange={(value) => handleInputChange("responseTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="48h">48 Hours</SelectItem>
                    <SelectItem value="72h">72 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Vendor</label>
                <Select value={formData.vendor} onValueChange={(value) => handleInputChange("vendor", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendor1">Vendor 1</SelectItem>
                    <SelectItem value="vendor2">Vendor 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Approval</label>
                <Select value={formData.approval} onValueChange={(value) => handleInputChange("approval", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select approval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Remark</label>
                <Textarea value={formData.remark} onChange={(e) => handleInputChange("remark", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Add RFI Activity List</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left text-sm font-medium">S.No</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Requirements</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Value</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Is Mandatory</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Is Attachment</th>
                    <th className="px-4 py-2 text-left text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id} className="border-b">
                      <td className="px-4 py-2 text-sm">{index + 1}</td>
                      <td className="px-4 py-2">
                        <Input
                          value={activity.requirements}
                          onChange={(e) => {
                            const newActivities = [...activities]
                            newActivities[index].requirements = e.target.value
                            setActivities(newActivities)
                          }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          value={activity.value}
                          onChange={(e) => {
                            const newActivities = [...activities]
                            newActivities[index].value = e.target.value
                            setActivities(newActivities)
                          }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Checkbox
                          checked={activity.isMandatory}
                          onCheckedChange={(checked) => {
                            const newActivities = [...activities]
                            newActivities[index].isMandatory = checked as boolean
                            setActivities(newActivities)
                          }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Checkbox
                          checked={activity.isAttachment}
                          onCheckedChange={(checked) => {
                            const newActivities = [...activities]
                            newActivities[index].isAttachment = checked as boolean
                            setActivities(newActivities)
                          }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        {index === activities.length - 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addActivity}
                            className="text-[#6C47FF] border-[#6C47FF]"
                          >
                            + Add
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Add RFI Details</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Responsible Person Name</label>
              <Textarea
                className="min-h-[100px]"
                value={formData.details}
                onChange={(e) => handleInputChange("details", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/rfi">
              <Button variant="outline">Back</Button>
            </Link>
            <Button variant="outline" className="text-[#6C47FF] border-[#6C47FF]" onClick={handleSave}>
              Save
            </Button>
            <Button className="bg-[#6C47FF]">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

