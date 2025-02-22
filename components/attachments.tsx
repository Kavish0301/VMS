"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, Eye, Download, Trash2, Upload } from "lucide-react"
import { toast } from "sonner"
import type { Attachment } from "@/lib/types"

interface AttachmentsProps {
  attachments: Attachment[]
  onChange: (attachments: Attachment[]) => void
}

export function Attachments({ attachments, onChange }: AttachmentsProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    const newAttachment: Attachment = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      file,
      dateCreated: new Date().toISOString().split("T")[0],
    }
    onChange([...attachments, newAttachment])
    toast.success("File uploaded successfully")
  }

  const handleDelete = (id: string) => {
    onChange(attachments.filter((a) => a.id !== id))
    toast.success("File deleted successfully")
  }

  const handleView = (attachment: Attachment) => {
    if (attachment.file) {
      const url = URL.createObjectURL(attachment.file)
      window.open(url, "_blank")
      URL.revokeObjectURL(url)
    }
  }

  const handleDownload = (attachment: Attachment) => {
    if (attachment.file) {
      const url = URL.createObjectURL(attachment.file)
      const a = document.createElement("a")
      a.href = url
      a.download = attachment.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("File downloaded successfully")
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100">
          <div className="col-span-1">S.No</div>
          <div className="col-span-7">Attachments</div>
          <div className="col-span-2">Date Created</div>
          <div className="col-span-2">Action</div>
        </div>

        {attachments.map((attachment, index) => (
          <div key={attachment.id} className="grid grid-cols-12 gap-4 p-4 items-center border-t">
            <div className="col-span-1">{index + 1}</div>
            <div className="col-span-7">
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                <span>{attachment.name}</span>
              </div>
            </div>
            <div className="col-span-2">{attachment.dateCreated}</div>
            <div className="col-span-2">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleView(attachment)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDownload(attachment)}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(attachment.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? "border-purple-500 bg-purple-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-600">Drag and drop files here, or click to select files</p>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFile(e.target.files[0])
              }
            }}
            id="file-upload"
          />
          <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
            Select File
          </Button>
        </div>
      </div>
    </div>
  )
}

