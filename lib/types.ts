export interface PurchaseRequisition {
  tempId: string
  prNo: string
  requestedBy: string
  department: string
  departmentHead: string
  requirementType: "service" | "product" | "project" | ""
  deliveryDate: string
  billingLocation: string
  purpose: string
  products: Product[]
  services: Service[]
  sowChecklist: SOWChecklistItem[]
  attachments: Attachment[]
  query: string
  status: "draft" | "submitted"
  total: number
}

export interface Product {
  id: string
  sNo: number
  brand: string
  model: string
  description: string
  quantity: number
  price: number
}

export interface Service {
  id: string
  sNo: number
  service: string
  description: string
  quantity: string
  attachment?: File | null
  price: number
}

export interface SOWChecklistItem {
  id: string
  sNo: number
  checklist: string
  comments: string
  remarks: string
}

export interface Attachment {
  id: string
  name: string
  file: File | null
  dateCreated: string
}

export const MANDATORY_SOW_CHECKLIST = [
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

export const getDepartmentHead = (department: string): string => {
  const heads: Record<string, string> = {
    IT: "John Smith",
    HR: "Jane Doe",
    Finance: "Mike Johnson",
    Operations: "Sarah Wilson",
  }
  return heads[department] || ""
}

export const getBillingLocation = (department: string): string => {
  const locations: Record<string, string> = {
    IT: "Gurugram",
    HR: "Delhi",
    Finance: "Mumbai",
    Operations: "Bangalore",
  }
  return locations[department] || ""
}

export interface RFI {
  id: number
  rfiNumber: string
  rfiName: string
  startDate: string
  endDate: string
  approval: string
  dateAdded: string
  lastUpdated: string
  status: "Active" | "Inactive"
  responsiblePerson: {
    name: string
    email: string
    phone: string
  }
  activities: Activity[]
}

export interface Activity {
  id: number
  requirements: string
  value: string
  isMandatory: boolean
  isAttachment: boolean
}
