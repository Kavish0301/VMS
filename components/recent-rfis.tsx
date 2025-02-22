"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentRFIs() {
  return (
    <div className="space-y-8">
      {recentRFIs.map((rfi) => (
        <div key={rfi.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={rfi.avatar} alt="Avatar" />
            <AvatarFallback>{rfi.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{rfi.name}</p>
            <p className="text-sm text-muted-foreground">{rfi.activity}</p>
          </div>
          <div className="ml-auto font-medium">{rfi.date}</div>
        </div>
      ))}
    </div>
  )
}

const recentRFIs = [
  {
    id: "1",
    name: "Divya Ojha",
    avatar: "/placeholder.svg",
    activity: "Created new RFI for Laptop procurement",
    date: "2h ago",
  },
  {
    id: "2",
    name: "Preet Singh",
    avatar: "/placeholder.svg",
    activity: "Updated RFI response",
    date: "4h ago",
  },
  {
    id: "3",
    name: "Rahul Sharma",
    avatar: "/placeholder.svg",
    activity: "Approved vendor qualification",
    date: "1d ago",
  },
]

