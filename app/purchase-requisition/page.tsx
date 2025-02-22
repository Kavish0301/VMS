import type { Metadata } from "next"
import { PurchaseRequisitionTabs } from "./purchase-requisition-tabs"

export const metadata: Metadata = {
  title: "Purchase Requisition",
  description: "Create and manage purchase requisitions",
}

export default function Page() {
  return <PurchaseRequisitionTabs />
}

