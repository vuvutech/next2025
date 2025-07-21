"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"; // Import useRouter


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

const FormSchema = z.object({
  makeAdmin: z.boolean(),
})

type Props = {
  userId: string
  isAdmin: boolean
}

export function AdminRoleToggleForm({ userId, isAdmin }: Props) {
  const router = useRouter() // Initialize router for navigation
  const [showDialog, setShowDialog] = useState(false)
  const [isPromoting, setIsPromoting] = useState(!isAdmin)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      makeAdmin: isAdmin,
    },
  })

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await fetch(`/api/users/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          role: data.makeAdmin ? "ADMIN" : "USER",
        }),
      })

      if (!res.ok) throw new Error("Failed to update role")

      toast.success(
        data.makeAdmin ? "User promoted to ADMIN" : "User demoted to USER"
      )
      router.refresh() // Refresh the page to reflect changes

      form.setValue("makeAdmin", data.makeAdmin)
      setShowDialog(false)
    } catch (err) {
      toast.error("An error occurred. Try again.")
    }
  }

  return (
    <>
      <Form {...form}>
        <form className="w-full space-y-4">
          <FormField
            control={form.control}
            name="makeAdmin"
            render={({ field }) => (
              <FormItem className="flex items-center gap-1">
                <FormLabel className="text-xs">Make Admin</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      form.setValue("makeAdmin", checked)
                      setIsPromoting(checked)
                      setShowDialog(true)
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isPromoting ? "Promote to ADMIN?" : "Demote to USER?"}
            </DialogTitle>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={form.handleSubmit(handleSubmit)}>
              {isPromoting ? "Confirm Promotion" : "Confirm Demotion"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
