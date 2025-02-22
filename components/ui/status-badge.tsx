import { cn } from "@/lib/utils"

interface StatusBadgeProps {
    status: "Active" | "Close" | "Pending" | "Approved" | "Declined" | "Stopped" | "Paused"
    className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const getStatusStyles = () => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "Close":
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
            case "Pending":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            case "Approved":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "Declined":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            case "Stopped":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            case "Paused":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
    }

    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                getStatusStyles(),
                className,
            )}
        >
            {status}
        </span>
    )
}