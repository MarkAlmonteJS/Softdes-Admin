"use client"
import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { firebasedb } from "../../../firebaseconfig";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table, TableFooter } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditButton } from "./editbutton";

// JSON Response from Invoice Table in a Database
const invoices = [];

export function AdminTable() {
  const [tableData, settableData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemList = collection(firebasedb, "Products");
        const querySnapshot = await getDocs(itemList);
        const fetchData = querySnapshot.docs.map(doc => ({ id: doc.id,...doc.data() }));
        settableData(fetchData);
      } catch (e) {
        console.error("Error getting documents: ", e);
      }
    };

    fetchItems();
  }, []);

  // Generate a random string for new invoice IDs
  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Handle adding a new invoice
  const handleAddInvoice = () => {
    const nextInvoiceId = generateRandomString(4); 
    const newInvoice = {
      ID: nextInvoiceId,
      paymentStatus: "Pending",
      totalAmount: "$0.00",
      paymentMethod: "Cash",
    };

    settableData([...tableData, newInvoice]);
  };

  // Renders each product in the table
  const renderInvoice = () => {
    return tableData.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell>{invoice.name}</TableCell>
        <TableCell> ₱ {invoice.price}</TableCell>
        <TableCell>{invoice.stock}</TableCell>
        <TableCell>
          <EditButton onEdit={handleEdit} initialInvoice={invoice} />
        </TableCell>
        <TableCell>
          <Button onClick={() => handleDelete(invoice.id)}>Delete</Button>
        </TableCell>
      </TableRow>
    ));
  };

  // Handle editing an invoice
  const handleEdit = (updatedInvoice) => {
    settableData(tableData.map(invoice =>
      invoice.id === updatedInvoice.id? updatedInvoice : invoice
    ));
  };

  // Handle deleting an invoice
  const handleDelete = (ID) => {
    const updatedInvoices = tableData.filter(invoice => invoice.id!== ID);
    settableData(updatedInvoices);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderInvoice()}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <Button onClick={handleAddInvoice}>Add Product</Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}