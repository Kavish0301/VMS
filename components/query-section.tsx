"use client"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface QuerySectionProps {
  query: string
  onChange: (query: string) => void
  onSubmit: () => void
}

const queryTemplates = [
  {
    value: "product-details",
    label: "Product Details Query",
    text: "I have a query regarding the product details section...",
  },
  {
    value: "sow",
    label: "SOW Checklist Query",
    text: "I need clarification about the Statement of Work...",
  },
  {
    value: "delivery",
    label: "Delivery Query",
    text: "I have questions about the delivery timeline...",
  },
  {
    value: "billing",
    label: "Billing Query",
    text: "I need to discuss the billing details...",
  },
  {
    value: "other",
    label: "Other Query",
    text: "",
  },
]

export function QuerySection({ query, onChange, onSubmit }: QuerySectionProps) {
  const handleQueryTemplateChange = (value: string) => {
    const template = queryTemplates.find((t) => t.value === value)
    if (template) {
      onChange(template.text)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Query Type</label>
          <Select onValueChange={handleQueryTemplateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a query type" />
            </SelectTrigger>
            <SelectContent>
              {queryTemplates.map((template) => (
                <SelectItem key={template.value} value={template.value}>
                  {template.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Query Details</label>
          <Textarea
            placeholder="Enter your query here..."
            value={query}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[200px]"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={onSubmit} className="bg-purple-600 hover:bg-purple-700 text-white">
          Submit Purchase Requisition
        </Button>
      </div>
    </div>
  )
}

