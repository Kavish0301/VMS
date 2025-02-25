import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentRFIs } from "@/components/recent-rfis"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
    return (
        <div className="min-h-screen flex bg-[#F8F8F8]">
            {/* Sidebar with fixed width */}
            <div className="w-64 min-h-screen bg-white shadow-lg">
                <Sidebar />
            </div>

            {/* Main Content (Takes Remaining Space) */}
            <div className="flex-1 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total RFIs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">+10% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active RFIs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">15</div>
                            <p className="text-xs text-muted-foreground">+5 since last week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Qualified Vendors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">32</div>
                            <p className="text-xs text-muted-foreground">+3 this week</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>RFI status overview for the current month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Overview />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent RFIs</CardTitle>
                            <CardDescription>Latest RFI submissions and updates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentRFIs />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}