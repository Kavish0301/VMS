import type { PurchaseRequisition } from "../types"

export function generateTempId(): string {
  return `TEMP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

export function generatePRNo(): string {
  return `PR-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
}

export function getCurrentUser(): { name: string; department: string; role: string } {
  // In a real app, this would come from your auth system
  return {
    name: "Divya Ojha",
    department: "IT",
    role: "Manager",
  }
}

export function getDepartmentHead(department: string): string {
  // This would typically come from your backend
  const heads = {
    IT: "John Smith",
    HR: "Jane Doe",
    Finance: "Mike Johnson",
  }
  return heads[department as keyof typeof heads] || ""
}

export function getBillingLocation(department: string): string {
  // This would typically come from your backend
  const locations = {
    IT: "Gurugram",
    HR: "Delhi",
    Finance: "Mumbai",
  }
  return locations[department as keyof typeof locations] || ""
}

export const initialFormState: PurchaseRequisition = {
  tempId: "",
  prNo: "",
  requestedBy: "",
  department: "",
  departmentHead: "",
  requirementType: "",
  deliveryDate: "",
  billingLocation: "",
  purpose: "",
  products: [],
  services: [],
  attachments: [],
  sowChecklist: [],
  queries: [],
  status: "draft",
}

