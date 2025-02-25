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

