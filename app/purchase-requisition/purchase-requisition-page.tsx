"use client"

import { useState, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Save } from "lucide-react"
import { ProductDetails } from "@/components/product-details"
import { SOWChecklist } from "@/components/sow-checklist"
import { Attachments } from "@/components/attachments"
import { QuerySection } from "@/components/query-section"
import { toast } from "sonner"
import type { PurchaseRequisition } from "@/lib/types"
import { MANDATORY_SOW_CHECKLIST, getDepartmentHead, getBillingLocation } from "@/lib/types"

const initialState: PurchaseRequisition = {
  tempId: "TEMP-" + Math.random().toString(36).substring(7).toUpperCase(),
  prNo: "PR-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(7).toUpperCase(),
  requestedBy: "Divya Ojha",
  department: "",
  departmentHead: "",
  requirementType: "",
  deliveryDate: "",
  billingLocation: "",
  purpose: "",
  products: [],
  services: [],
  sowChecklist: MANDATORY_SOW_CHECKLIST.map((checklist, index) => ({
    id: String(index + 1),
    sNo: index + 1,
    checklist,
    comments: "",
    remarks: "",
  })),
  attachments: [],
  query: "",
  status: "draft",
  total: 0,
}

export function PurchaseRequisitionPage() {
  const [formData, setFormData] = useState<PurchaseRequisition>(initialState)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("product-details")
  const [isSaving, setIsSaving] = useState(false)

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      department: value,
      departmentHead: getDepartmentHead(value),
      billingLocation: getBillingLocation(value),
    }))
  }

  const validateForm = () => {
    if (!formData.department) {
      toast.error("Please select a department")
      return false
    }
    if (!formData.requirementType) {
      toast.error("Please select a requirement type")
      return false
    }
    if (!formData.deliveryDate) {
      toast.error("Please select a delivery date")
      return false
    }
    if (!formData.purpose) {
      toast.error("Please enter a purpose")
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setFormData((prev) => ({ ...prev, status: "submitted" }))
      setShowSuccess(true)
      toast.success("Purchase requisition submitted successfully")
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      toast.error("Failed to submit purchase requisition")
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Purchase requisition details saved successfully")
    } catch (error) {
      toast.error("Failed to save purchase requisition details")
    } finally {
      setIsSaving(false)
    }
  }

  const handleProductsChange = useCallback((products: PurchaseRequisition["products"]) => {
    setFormData((prev) => ({ ...prev, products }))
  }, [])

  const handleServicesChange = useCallback((services: PurchaseRequisition["services"]) => {
    setFormData((prev) => ({ ...prev, services }))
  }, [])

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Purchase Requisition</h1>

      {showSuccess && (
        <Alert className="mb-6 bg-orange-500 text-white">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Nice! Purchase request has been Successfully Sent for Approval.</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">Temp ID</label>
          <Input value={formData.tempId} disabled placeholder="Autofill" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">PR NO</label>
          <Input value={formData.prNo} disabled placeholder="Autofill" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Requested By</label>
          <Input value={formData.requestedBy} disabled placeholder="Autofill" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Department</label>
          <Select value={formData.department} onValueChange={handleDepartmentChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Department Head</label>
          <Input value={formData.departmentHead} disabled placeholder="Autofill" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Type of Requirement</label>
          <Select
            value={formData.requirementType}
            onValueChange={(value: "service" | "product" | "project") =>
              setFormData((prev) => ({ ...prev, requirementType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="project">Project</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Delivery on or before</label>
          <Input
            type="date"
            value={formData.deliveryDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, deliveryDate: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Billing Location</label>
          <Input value={formData.billingLocation} disabled placeholder="Autofill" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-100 p-1 rounded-md">
          <TabsTrigger
            value="product-details"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Product Details
          </TabsTrigger>
          <TabsTrigger value="sow" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            SOW
          </TabsTrigger>
          <TabsTrigger value="attachment" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Other Attachment
          </TabsTrigger>
          <TabsTrigger value="query" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Query
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product-details">
          <ProductDetails
            type={formData.requirementType}
            products={formData.products}
            services={formData.services}
            purpose={formData.purpose}
            onPurposeChange={(purpose) => setFormData((prev) => ({ ...prev, purpose }))}
            onProductsChange={handleProductsChange}
            onServicesChange={handleServicesChange}
          />
        </TabsContent>

        <TabsContent value="sow">
          <SOWChecklist
            checklist={formData.sowChecklist}
            onChange={(sowChecklist) => setFormData((prev) => ({ ...prev, sowChecklist }))}
          />
        </TabsContent>

        <TabsContent value="attachment">
          <Attachments
            attachments={formData.attachments}
            onChange={(attachments) => setFormData((prev) => ({ ...prev, attachments }))}
          />
        </TabsContent>

        <TabsContent value="query">
          <QuerySection
            query={formData.query}
            onChange={(query) => setFormData((prev) => ({ ...prev, query }))}
            onSubmit={handleSubmit}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Details"}
        </Button>
      </div>
    </div>
  )
}

