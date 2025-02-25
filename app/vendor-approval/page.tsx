"use client"

import { Search, Home, LayoutDashboard, FileText, LogOut, MoreVertical, PenSquare, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VendorApproval() {
  const router = useRouter();
  const [level, setLevel] = useState("Approved");


  return (
    <div className="min-h-screen flex dark:bg-background">
      {/* Sidebar */}


      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Vendor Approval</Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input className="pl-10 w-[300px]" type="search" placeholder="Search" />
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block mb-2 text-sm">Person Name</label>
            <Input placeholder="Name" />
          </div>
          <div>
            <label className="block mb-2 text-sm">Vendor Name</label>
            <Input placeholder="Name" />
          </div>
          <div>
            <label className="block mb-2 text-sm">Mobile No</label>
            <Input placeholder="Name" />
          </div>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm">Email Id</label>
              <Input placeholder="Name" />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Send</Button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Person Name</TableHead>
                <TableHead>Contact No</TableHead>
                <TableHead>Email Id</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ananya Joshi</TableCell>
                <TableCell>Chiku Organization</TableCell>
                <TableCell>Lorem</TableCell>
                <TableCell>Lorem</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${level === "Approved" ? "bg-green-100 text-green-600" :
                            level === "On Hold" ? "bg-yellow-100 text-yellow-600" :
                              "bg-red-100 text-red-600"
                          }`}
                      >
                        {level}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setLevel("Approved")}>Approved</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLevel("On Hold")}>On Hold</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLevel("Declined")}>Declined</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <PenSquare className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/vendor-approval/view")}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>

          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4">
          <Button variant="outline" size="icon">
            &lt;
          </Button>
          <Button variant="outline" size="icon" className="bg-purple-600 text-white">
            1
          </Button>
          <Button variant="outline" size="icon">
            2
          </Button>
          <Button variant="outline" size="icon">
            3
          </Button>
          <Button variant="outline" size="icon">
            4
          </Button>
          <Button variant="outline" size="icon">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}

