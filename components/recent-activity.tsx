export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.action}</p>
            <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const activities = [
  {
    action: "Created new RFI for IT Equipment",
    timestamp: "2 hours ago",
  },
  {
    action: "Updated vendor response for Software RFI",
    timestamp: "4 hours ago",
  },
  {
    action: "Submitted approval for Hardware procurement",
    timestamp: "1 day ago",
  },
  {
    action: "Added new vendor to qualified list",
    timestamp: "2 days ago",
  },
]

