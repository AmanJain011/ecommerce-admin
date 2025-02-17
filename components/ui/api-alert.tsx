"use client"
import toast from "react-hot-toast"
import { Copy, Server } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ApiAlertProp {
    title: string,
    description: string,
    varient: "public" | "admin"
}

const textMap: Record<ApiAlertProp["varient"], string> = {
    public: "Public",
    admin: "Admin"
}

const varientMap: Record<ApiAlertProp["varient"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

export const ApiAlert: React.FC<ApiAlertProp> = ({
    title,
    description,
    varient = "public"
}) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success("API Route copied to the clipboard 😎.")
    }

    return (
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={varientMap[varient]}>
                    {textMap[varient]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button variant="outline" size="icon" onClick={onCopy}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}