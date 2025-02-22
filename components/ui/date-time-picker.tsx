"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateTimePickerProps {
  date: Date
  setDate: (date: Date) => void
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const updatedDate = new Date(date)
      updatedDate.setFullYear(newDate.getFullYear())
      updatedDate.setMonth(newDate.getMonth())
      updatedDate.setDate(newDate.getDate())
      setSelectedDate(updatedDate)
      setDate(updatedDate)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":")
    const updatedDate = new Date(selectedDate || date)
    updatedDate.setHours(Number(hours))
    updatedDate.setMinutes(Number(minutes))
    setSelectedDate(updatedDate)
    setDate(updatedDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm") : <span>Pick date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} initialFocus />
        <div className="p-3 border-t">
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" value={format(selectedDate || date, "HH:mm")} onChange={handleTimeChange} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

