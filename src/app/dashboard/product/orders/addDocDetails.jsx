"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import adminlogo from "../../../../../public/logo1.jpeg";
import { Sidebar } from "@/components/component/sidebar";
import { firebasedb } from "../../../../../firebaseconfig";
import { useState, useEffect } from "react";
import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { EditOrder } from "../../../../components/component/editorders"




export default function Ordertable() {

  const [transactions, setTransactions] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const handleStatusChange = async (transactionId, newStatus) => {
    setSelectedStatuses(prev => ({ ...prev, [transactionId]: newStatus }));

    // Call a function to update the Firebase database
    await updateStatusInFirebase(transactionId, newStatus);
  };

  const updateStatusInFirebase = async (transactionId, newStatus) => {
    try {
      const docRef = doc(firebasedb, "Transaction", transactionId);
      await updateDoc(docRef, { status: newStatus });
      console.log(`Status updated for transaction ${transactionId}`);
    } catch (error) {
      console.error("Error updating status in Firebase:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(firebasedb, "Transaction");
        const snapshot = await getDocs(collectionRef);
        const data = await Promise.all(snapshot.docs.map(async (docSnapshot) => {
          const transaction = { id: docSnapshot.id, ...docSnapshot.data() };
          const userRef = doc(firebasedb, "UserList", transaction.userID);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const user = userSnapshot.data();
            return { ...transaction, user }; // Include user details in the transaction object
          } else {
            return transaction; // Return transaction without user details if user does not exist
          }
        }));
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6 bg-[#279486]">
            <Image alt="logo " src={adminlogo} height={50} style={{ marginRight: 10 }} />
            <Link className="flex items-center font-semibold text-white" href="/dashboard">
              <span className="">Mikee's Curtain Admin</span>
            </Link>
          </div>
          <Sidebar Tab="adddetails" />
          <div className="p-4">

          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-[#279486] px-6 dark:bg-gray-800/40">

          <Link className="lg:hidden" href="#">

            <span className="sr-only">Home</span>
          </Link>

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
                  <TableHead >Transaction No.</TableHead>
                  <TableHead >Ordered By</TableHead>
                  <TableHead >Order Date</TableHead>
                  <TableHead >Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell># {transaction.transactionNumber}</TableCell>
                    <TableCell>{`${transaction.user.name} ${transaction.user.last}`}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell className="flex gap-2">
                      <EditOrder status={selectedStatuses[transaction.id] || transaction.status} onStatusChange={(newStatus) => handleStatusChange(transaction.id, newStatus)} />
                      <Button>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  )
}

