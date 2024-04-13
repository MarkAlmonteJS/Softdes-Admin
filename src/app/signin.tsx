
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SigninAdmin() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[400px]">
      <div className="w-full max-w-[400px] grid gap-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Step2Cash</h1>
          <p className="text-gray-500 dark:text-gray-400">Admin Dashboard</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Username" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="Password" required type="password" />
        </div>
        <Button className="w-full">Sign In</Button>
      </div>
      <div className="text-center text-sm text-blue-500">
    
      </div>
    </div>
  )
}

