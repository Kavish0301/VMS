"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, PenSquare, MoreVertical } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Product, Service } from "@/lib/types"

interface ProductDetailsProps {
  type: string
  products: Product[]
  services: Service[]
  purpose: string
  onPurposeChange: (purpose: string) => void
  onProductsChange: (products: Product[]) => void
  onServicesChange: (services: Service[]) => void
}

interface ChecklistItem {
  id: string
  sNo: number
  item: string
  comments: string
  remarks: string
}

export function ProductDetails({
  type,
  products,
  services,
  purpose,
  onPurposeChange,
  onProductsChange,
  onServicesChange,
}: ProductDetailsProps) {
  const [localProducts, setLocalProducts] = useState<Product[]>(products)
  const [localServices, setLocalServices] = useState<Service[]>(services)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "1",
      sNo: 1,
      item: "Budgeted Expenditure",
      comments: "",
      remarks: "",
    },
    {
      id: "2",
      sNo: 2,
      item: "Funds Available",
      comments: "",
      remarks: "",
    },
  ])

  useEffect(() => {
    if (localProducts.length === 0 && type !== "service") {
      setLocalProducts([
        {
          id: "1",
          sNo: 1,
          brand: "Laptop",
          model: "Lorem Ipsum noi",
          description: "Lorem Ipsum noi",
          quantity: 1,
          price: 0,
        },
      ])
    }
    if (localServices.length === 0 && type !== "product") {
      setLocalServices([
        {
          id: "1",
          sNo: 1,
          service: "Laptop",
          description: "Lorem Ipsum lh noi",
          quantity: "3Month",
          attachment: null,
          price: 0,
        },
      ])
    }
  }, [type, localProducts.length, localServices.length])

  useEffect(() => {
    onProductsChange(localProducts)
  }, [localProducts, onProductsChange])

  useEffect(() => {
    onServicesChange(localServices)
  }, [localServices, onServicesChange])

  const addProduct = () => {
    const newProduct: Product = {
      id: Math.random().toString(36).substring(7),
      sNo: localProducts.length + 1,
      brand: "",
      model: "",
      description: "",
      quantity: 1,
      price: 0,
    }
    setLocalProducts([...localProducts, newProduct])
  }

  const addService = () => {
    const newService: Service = {
      id: Math.random().toString(36).substring(7),
      sNo: localServices.length + 1,
      service: "",
      description: "",
      quantity: "",
      attachment: null,
      price: 0,
    }
    setLocalServices([...localServices, newService])
  }

  const addChecklistItem = () => {
    const newItem: ChecklistItem = {
      id: Math.random().toString(36).substring(7),
      sNo: checklist.length + 1,
      item: "",
      comments: "",
      remarks: "",
    }
    setChecklist([...checklist, newItem])
  }

  const deleteChecklistItem = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id).map((item, index) => ({ ...item, sNo: index + 1 })))
  }

  const handleFileChange = (serviceId: string, file: File) => {
    setLocalServices(localServices.map((s) => (s.id === serviceId ? { ...s, attachment: file } : s)))
  }

  const TableActions = ({ onAdd, onDelete }: { onAdd: () => void; onDelete?: () => void }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onAdd}>Add New Row</DropdownMenuItem>
        {onDelete && <DropdownMenuItem onClick={onDelete}>Delete Row</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Purpose</label>
        <Textarea
          placeholder="Enter purpose"
          value={purpose}
          onChange={(e) => onPurposeChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {(type === "product" || type === "project") && (
        <div className="space-y-4">
          {type === "project" && <h3 className="font-medium">Product</h3>}
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100">
              <div className="col-span-1">S.No</div>
              <div className="col-span-2">Brand</div>
              <div className="col-span-3">Model</div>
              <div className="col-span-3">Description</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-1">
                <TableActions onAdd={addProduct} />
              </div>
            </div>

            {localProducts.map((product) => (
              <div key={product.id} className="grid grid-cols-12 gap-4 p-4 items-center border-t">
                <div className="col-span-1">{product.sNo}</div>
                <div className="col-span-2">
                  <Input
                    value={product.brand}
                    onChange={(e) => {
                      const updated = localProducts.map((p) =>
                        p.id === product.id ? { ...p, brand: e.target.value } : p,
                      )
                      setLocalProducts(updated)
                    }}
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    value={product.model}
                    onChange={(e) => {
                      const updated = localProducts.map((p) =>
                        p.id === product.id ? { ...p, model: e.target.value } : p,
                      )
                      setLocalProducts(updated)
                    }}
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    value={product.description}
                    onChange={(e) => {
                      const updated = localProducts.map((p) =>
                        p.id === product.id ? { ...p, description: e.target.value } : p,
                      )
                      setLocalProducts(updated)
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => {
                      const updated = localProducts.map((p) =>
                        p.id === product.id ? { ...p, quantity: Number(e.target.value) } : p,
                      )
                      setLocalProducts(updated)
                    }}
                    min={1}
                  />
                </div>
                <div className="col-span-1">
                  <TableActions
                    onAdd={addProduct}
                    onDelete={() => {
                      const updated = localProducts
                        .filter((p) => p.id !== product.id)
                        .map((p, idx) => ({ ...p, sNo: idx + 1 }))
                      setLocalProducts(updated)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {type === "product" && (
            <div className="rounded-md border mt-8">
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100">
                <div className="col-span-1">S.No</div>
                <div className="col-span-5">Checklist</div>
                <div className="col-span-3">Comments (Yes/No)</div>
                <div className="col-span-2">Remarks</div>
                <div className="col-span-1">Actions</div>
              </div>

              {checklist.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center border-t">
                  <div className="col-span-1">{item.sNo}</div>
                  <div className="col-span-5">
                    <Input
                      value={item.item}
                      onChange={(e) => {
                        const updated = checklist.map((c) => (c.id === item.id ? { ...c, item: e.target.value } : c))
                        setChecklist(updated)
                      }}
                    />
                  </div>
                  <div className="col-span-3">
                    <RadioGroup
                      value={item.comments}
                      onValueChange={(value) => {
                        const updated = checklist.map((c) => (c.id === item.id ? { ...c, comments: value } : c))
                        setChecklist(updated)
                      }}
                      className="flex items-center space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`yes-${item.id}`} />
                        <Label htmlFor={`yes-${item.id}`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`no-${item.id}`} />
                        <Label htmlFor={`no-${item.id}`}>No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="col-span-2">
                    <Input
                      value={item.remarks}
                      onChange={(e) => {
                        const updated = checklist.map((c) => (c.id === item.id ? { ...c, remarks: e.target.value } : c))
                        setChecklist(updated)
                      }}
                    />
                  </div>
                  <div className="col-span-1">
                    <TableActions onAdd={addChecklistItem} onDelete={() => deleteChecklistItem(item.id)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {(type === "service" || type === "project") && (
        <div className="space-y-4">
          {type === "project" && <h3 className="font-medium mt-6">Service</h3>}
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100">
              <div className="col-span-1">S.No</div>
              <div className="col-span-2">Service</div>
              <div className="col-span-4">Descriptions</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Attachment</div>
              <div className="col-span-1">
                <TableActions onAdd={addService} />
              </div>
            </div>

            {localServices.map((service) => (
              <div key={service.id} className="grid grid-cols-12 gap-4 p-4 items-center border-t">
                <div className="col-span-1">{service.sNo}</div>
                <div className="col-span-2">
                  <Input
                    value={service.service}
                    onChange={(e) => {
                      const updated = localServices.map((s) =>
                        s.id === service.id ? { ...s, service: e.target.value } : s,
                      )
                      setLocalServices(updated)
                    }}
                  />
                </div>
                <div className="col-span-4">
                  <Input
                    value={service.description}
                    onChange={(e) => {
                      const updated = localServices.map((s) =>
                        s.id === service.id ? { ...s, description: e.target.value } : s,
                      )
                      setLocalServices(updated)
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    value={service.quantity}
                    onChange={(e) => {
                      const updated = localServices.map((s) =>
                        s.id === service.id ? { ...s, quantity: e.target.value } : s,
                      )
                      setLocalServices(updated)
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="file"
                    id={`file-${service.id}`}
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileChange(service.id, e.target.files[0])
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => document.getElementById(`file-${service.id}`)?.click()}
                  >
                    <PenSquare className="h-4 w-4" />
                  </Button>
                  {service.attachment && <span className="ml-2 text-sm text-gray-500">{service.attachment.name}</span>}
                </div>
                <div className="col-span-1">
                  <TableActions
                    onAdd={addService}
                    onDelete={() => {
                      const updated = localServices
                        .filter((s) => s.id !== service.id)
                        .map((s, idx) => ({ ...s, sNo: idx + 1 }))
                      setLocalServices(updated)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {type === "service" && (
            <div className="rounded-md border mt-8">
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100">
                <div className="col-span-1">S.No</div>
                <div className="col-span-5">Checklist</div>
                <div className="col-span-3">Comments (Yes/No)</div>
                <div className="col-span-2">Remarks</div>
                <div className="col-span-1">Actions</div>
              </div>

              {checklist.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center border-t">
                  <div className="col-span-1">{item.sNo}</div>
                  <div className="col-span-5">
                    <Input
                      value={item.item}
                      onChange={(e) => {
                        const updated = checklist.map((c) => (c.id === item.id ? { ...c, item: e.target.value } : c))
                        setChecklist(updated)
                      }}
                    />
                  </div>
                  <div className="col-span-3">
                    <RadioGroup
                      value={item.comments}
                      onValueChange={(value) => {
                        const updated = checklist.map((c) => (c.id === item.id ? { ...c, comments: value } : c))
                        setChecklist(updated)
                      }}
                      className="flex items-center space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`yes-${item.id}`} />
                        <Label htmlFor={`yes-${item.id}`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`no-${item.id}`} />
                        <Label htmlFor={`no-${item.id}`}>No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="col-span-2">
                    <Input
                      value={item.remarks}
                      onChange={(e) => {
                        const updated = checklist.map((c) => (c.id === item.id ? { ...c, remarks: e.target.value } : c))
                        setChecklist(updated)
                      }}
                    />
                  </div>
                  <div className="col-span-1">
                    <TableActions onAdd={addChecklistItem} onDelete={() => deleteChecklistItem(item.id)} />
                  </div>
                </div>
              ))}

              <div className="p-4 border-t">
                <Button variant="outline" onClick={addChecklistItem} className="gap-2">
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {type && (localProducts.length > 0 || localServices.length > 0) && (
        <div className="flex justify-end mt-4">
          <div className="border rounded-md px-4 py-2">
            <span className="font-medium">Total:</span> {calculateTotal(localProducts, localServices)}
          </div>
        </div>
      )}
    </div>
  )
}

function calculateTotal(products: Product[], services: Service[]): number {
  const productTotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const serviceTotal = services.reduce((sum, item) => sum + item.price, 0)
  return productTotal + serviceTotal
}

