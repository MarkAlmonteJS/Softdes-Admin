
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import shoe from '../../../../../public/shoes.png'
import { Sidebar } from "@/components/component/sidebar"
export default function Dash() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6 bg-[#05445e]">
          <Image alt="logo "src={shoe} height={50} style={{marginRight:10}}/>
          <Link className="flex items-center font-semibold text-white" href="/dashboard">
          <span className="">Step2Cash</span>
          </Link>

      
          </div>
       <Sidebar Tab="adddetails"/>
          <div className="p-4">
           
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-[#05445e] px-6 dark:bg-gray-800/40">
          
          <Link className="lg:hidden" href="#">
          
            <span className="sr-only">Home</span>
          </Link>
          {/**TOP MENU */}
          <div className="w-full flex-1">
            <form>
              <div className="relative">
         
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search Reward"
                  type="search"
                />
              </div>
            </form>
          </div>
                    {/**TOP MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <Image
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="">
            <h1 className="font-semibold text-lg md:text-2xl">Order List</h1>

      



          
          </div>
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead >Order Name</TableHead>
                  <TableHead >Ordered By</TableHead>
                  <TableHead >Order Date</TableHead>
                  <TableHead >Status</TableHead>
           
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  
                  <TableCell className="font-medium">Gcash 50</TableCell>
          
                  <TableCell>Neilson</TableCell>
                  <TableCell>4/13/24</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell className="flex gap-2 ">
                    <Button >
                      Edit Status
                      <span className="sr-only">Edit</span>
                    </Button>
                    
                    <Button >
                      Delete
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  )
}

