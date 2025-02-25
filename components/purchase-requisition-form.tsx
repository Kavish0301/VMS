"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductDetails } from "@/components/product-details"
import { SOWChecklist } from "@/components/sow-checklist"
import { Attachments } from "@/components/attachments"
import { QuerySection } from "@/components/query-section"
import type { Attachment, PurchaseRequisition } from "@/lib/types"

const initialState: PurchaseRequisition = {
  tempId: "TEMP-" + Math.random().toString(36).substring(7).toUpperCase(),
  prNo: "PR-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(7).toUpperCase(),
  requestedBy: "",
  department: "",
  departmentHead: "",
  requirementType: "",
  deliveryDate: "",
  billingLocation: "",
  purpose: "",
  products: [],
  services: [],
  sowChecklist: [
    { id: "1", sNo: 1, checklist: "Budgeted Expenditure", comments: "", remarks: "" },
    { id: "2", sNo: 2, checklist: "Funds Available", comments: "", remarks: "" },
  ],
  total: 0,
  attachments: [],
  query: "",
  status: "draft"
}

export function PurchaseRequisitionForm() {
  const [formData, setFormData] = useState<PurchaseRequisition>(initialState)

  const handleRequirementTypeChange = (value: "service" | "product" | "project") => {
    setFormData((prev) => ({
      ...prev,
      requirementType: value,
      products: [],
      services: [],
      total: 0,
    }))
  }

  const calculateTotal = (products: PurchaseRequisition["products"], services: PurchaseRequisition["services"]) => {
    const productTotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const serviceTotal = services.reduce((sum, item) => sum + item.price, 0)
    return productTotal + serviceTotal
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Purchase Requisition</h1>

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
          <Input
            value={formData.requestedBy}
            onChange={(e) => setFormData((prev) => ({ ...prev, requestedBy: e.target.value }))}
            placeholder="Autofill"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Department</label>
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Department Head</label>
          <Input value={formData.departmentHead} placeholder="Autofill" disabled />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Type of Requirement</label>
          <Select value={formData.requirementType} onValueChange={handleRequirementTypeChange}>
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
          <Input value={formData.billingLocation} placeholder="Autofill" disabled />
        </div>
      </div>

      <Tabs defaultValue="product-details" className="space-y-4">
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
            onProductsChange={(products) => {
              setFormData((prev) => ({
                ...prev,
                products,
                total: calculateTotal(products, prev.services),
              }))
            }}
            onServicesChange={(services) => {
              setFormData((prev) => ({
                ...prev,
                services,
                total: calculateTotal(prev.products, services),
              }))
            }} purpose={""} onPurposeChange={function (purpose: string): void {
              throw new Error("Function not implemented.")
            }} />
        </TabsContent>

        <TabsContent value="sow">
          <SOWChecklist
            checklist={formData.sowChecklist}
            onChange={(checklist) => setFormData((prev) => ({ ...prev, checklist }))}
          />
        </TabsContent>

        <TabsContent value="attachment">
          <Attachments attachments={[]} onChange={function (attachments: Attachment[]): void {
            throw new Error("Function not implemented.")
          }} />
        </TabsContent>

        <TabsContent value="query">
          <QuerySection query={""} onChange={function (query: string): void {
            throw new Error("Function not implemented.")
          }} onSubmit={function (): void {
            throw new Error("Function not implemented.")
          }} />
        </TabsContent>
      </Tabs>

      {formData.total > 0 && (
        <div className="flex justify-end mt-4">
          <div className="border rounded-md px-4 py-2">
            <span className="font-medium">Total:</span> {formData.total}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline">Save</Button>
        <Button className="bg-purple-600 hover:bg-purple-700">Submit</Button>
      </div>
    </div>
  )
}

