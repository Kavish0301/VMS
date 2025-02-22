"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const MANDATORY_CHECKLIST = [
  "Have you reviewed SOW and BOQ attached in the Bid",
  "Have you understand the scope the work clearly",
  "Have you initiated technical discussion with End user if details were not clear",
  "Have you Quoted the rates as per the BOQ",
  "Have you quoted rate for all line items as per BOQ",
  "Have you considered correct Make and Quantity as mentioned in BOQ",
  "Is there any deviation from the BOQ and intimated same to End User",
  "Are you MSME registered Supplier",
  "Have you considered Delivery/ Service timeline while quoting the offer",
  "Have you done Site visit as mentioned in SOW/BOQ",
]

interface SOWChecklistItem {
  id: string
  sNo: number
  checklist: string
  comments: string
  remarks: string
  isNew?: boolean
}

interface SOWChecklistProps {
  checklist: SOWChecklistItem[]
  onChange: (checklist: SOWChecklistItem[]) => void
}

export function SOWChecklist({ checklist, onChange }: SOWChecklistProps) {
  const [localChecklist, setLocalChecklist] = useState<SOWChecklistItem[]>(checklist)

  const addChecklistItem = () => {
    const newItem: SOWChecklistItem = {
      id: Math.random().toString(36).substring(7),
      sNo: localChecklist.length + 1,
      checklist: "",
      comments: "",
      remarks: "",
      isNew: true,
    }
    const updatedChecklist = [...localChecklist, newItem]
    setLocalChecklist(updatedChecklist)
    onChange(updatedChecklist)
  }

  const deleteChecklistItem = (id: string) => {
    const updatedChecklist = localChecklist
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, sNo: index + 1 }))
    setLocalChecklist(updatedChecklist)
    onChange(updatedChecklist)
  }

  const updateChecklistItem = (id: string, field: keyof SOWChecklistItem, value: string) => {
    const updatedChecklist = localChecklist.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    setLocalChecklist(updatedChecklist)
    onChange(updatedChecklist)
  }

  const getRemarkInput = (item: SOWChecklistItem) => {
    if (item.checklist === "Are you MSME registered Supplier") {
      return (
        <Textarea
          value={item.remarks}
          onChange={(e) => updateChecklistItem(item.id, "remarks", e.target.value)}
          placeholder="If yes, please mention category (Small, Micro or Medium)"
          className="min-h-[60px] resize-none"
        />
      )
    }

    return <Input value={item.remarks} onChange={(e) => updateChecklistItem(item.id, "remarks", e.target.value)} />
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100">
          <div className="col-span-1">S.No</div>
          <div className="col-span-5">Checklist</div>
          <div className="col-span-3">Comments (Yes/No)</div>
          <div className="col-span-3">Remarks</div>
        </div>

        {localChecklist.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center border-t">
            <div className="col-span-1">{item.sNo}</div>
            <div className="col-span-5">
              <Input
                value={item.checklist}
                onChange={(e) => updateChecklistItem(item.id, "checklist", e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <RadioGroup
                value={item.comments}
                onValueChange={(value) => updateChecklistItem(item.id, "comments", value)}
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
            <div className="col-span-3">{getRemarkInput(item)}</div>
            {item.isNew && (
              <div className="col-span-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => deleteChecklistItem(item.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-start">
        <Button
          variant="outline"
          onClick={addChecklistItem}
          className="gap-2 bg-purple-600 text-white hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" /> Add New Row
        </Button>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Note:- Any deviation from this Checklist after releasing the PO, it will not be acceptable.
      </div>
    </div>
  )
}

