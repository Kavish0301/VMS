"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PurchaseRequisitionPage } from "./purchase-requisition-page"
import { ApprovedPRList } from "@/components/approved-pr-list"
import { Sidebar } from "@/components/sidebar"

export function PurchaseRequisitionTabs() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen shadow-lg ">
        <Sidebar />
      </div>
      <div className="h-full flex flex-col " style={{ width: "85vw" }}>
        <header className="border-b px-6 py-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Vendor Management</div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="flex-1 p-6">
          <Tabs defaultValue="purchase-requisition" className="h-full">
            <TabsList className="bg-transparent border-b mb-4 w-auto h-auto p-0 space-x-6">
              <TabsTrigger
                value="purchase-requisition"
                className="text-base data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none border-b-2 border-transparent px-0 pb-2"
              >
                Purchase Requisition
              </TabsTrigger>
              <TabsTrigger
                value="approved-pr"
                className="text-base data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none border-b-2 border-transparent px-0 pb-2"
              >
                Approved PR
              </TabsTrigger>
            </TabsList>
            <TabsContent value="purchase-requisition" className="mt-0">
              <PurchaseRequisitionPage />
            </TabsContent>
            <TabsContent value="approved-pr" className="mt-0">
              <ApprovedPRList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

