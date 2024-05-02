'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import adminlogo  from "../../../../../public/logo1.jpeg";
import React, { useState } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Sidebar } from "@/components/component/sidebar";
import { firebasedb } from "../../../../../firebaseconfig";



interface Product {
  id:string;
  Image:string;
  name: string;
  price:Number;
  stock:Number;
  available:string;

  }

export default function AddDoc() {


const [productdata, setproductdata] = useState<Product>({
  id: '',
  name: '',
  price: 0,
  Image: '',
  stock: 0,
  available: '',

});

const staticLink = process.env.NEXT_PUBLIC_STATIC
const SP = process.env.NEXT_PUBLIC_SP1 || process.env.NEXT_PUBLIC_SP2
const main = process.env.NEXT_PUBLIC_MAIN
const MP = process.env.NEXT_PUBLIC_MP1 || process.env.NEXT_PUBLIC_MP2
const jwt = process.env.ADMIN_JWT

 const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setproductdata({
     ...productdata,
     [e.target.name]: e.target.value,
  });
 };

 

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setproductdata({
     ...productdata,
     [e.target.name]: e.target.value,
  });
 };


 const handleDropdown = (value: boolean) => {
  setproductdata(prevState => ({
    ...prevState,
    Available: value,
  }));
};

const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  console.log("Uploading: ",file?.name)
  if (file) {

    setproductdata(prevState => ({
      ...prevState,
      RewardPhoto: file,
    }));
  }
};


const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  if (name === 'price' || name === 'stock') {
     setproductdata(prevState => ({
       ...prevState,
       [name]: parseFloat(value),
     }));
  } else {
     setproductdata(prevState => ({
       ...prevState,
       [name]: value,
     }));
  }
 };

 const storage = getStorage();

 const uploadFile = async (file:any) => {
   const storageRef = ref(storage, `images/${file.name}`);
   const uploadTask = uploadBytesResumable(storageRef, file);

   uploadTask.on(
     "state_changed",
     (snapshot) => {
       // Monitor progress here
     },
     (error) => {
       // Handle unsuccessful uploads
       console.error(error);
     },
     async () => {
       try {
         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
         console.log("File available at", downloadURL);
         // Update the state with the download URL
         setproductdata(prevState => ({
          ...prevState,
           Image: downloadURL,
         }));
       } catch (error) {
         console.error("Error getting download URL:", error);
       }
     }
   );
 };
 const updateDatabase = async () => {
  try {
    // Define the collection
    const myCollection = collection(firebasedb, 'Products');

    // Prepare the data to store
    const dataToStore = {
     ...productdata,
    };

    // Add the document to the collection
    const newDocRef = await addDoc(myCollection, dataToStore);

    // Log the document ID
    console.log('New document added with ID:', newDocRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    alert('Failed to add product. Please try again.');
  }
};
 
 return (
  <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
  <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
    <div className="flex h-full max-h-screen flex-col gap-2">
    <div className="flex h-[60px] items-center border-b px-6 bg-[#279486]">
      <Image alt="logo "src={adminlogo} height={50} style={{marginRight:10}}/>
      <Link className="flex items-center font-semibold text-white" href="/dashboard">
          <span className="">Mikee's Curtain Admin</span>
          </Link>

  
      </div>
     <Sidebar Tab="adddocu"/>

    </div>
  </div>
  <div className="flex flex-col">
  <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-[#279486] px-6 dark:bg-gray-800/40">
      <Link className="lg:hidden flex items-center gap-2 text-xl font-semibold" href="#">
   
        <span className="sr-only">Home</span>
      </Link>
  
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
        
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
      <div className="container mx-auto space-y-4">
        <div className="flex items-center gap-2">

          <h1 className="font-semibold text-lg md:text-2xl">Add Product</h1>
        </div>
        <div className="grid gap-4">
        <form>
 <div className="grid gap-1">
    <Label className="text-sm" htmlFor="Title">
      Product Name
    </Label>
    <Input id="name" name="name" placeholder="Enter Document Title" value={productdata.name}
     onChange={handleInputChange} 
     className={` ${productdata.name ? '' : 'border-red-500'}`}
     />
 </div>



 <div className="grid gap-1">
    <Label className="text-sm" htmlFor="ProductPhoto">
        Product Photo
    </Label>
    <Input
        id="ProductPhoto"
        name="ProductPhoto"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handlePhotoChange}
        className={` ${productdata.Image ? '' : 'border-red-500'}`}
    />
</div>

<div className="grid gap-1">
    <Label className="text-sm" htmlFor="price">
      Product Cost
    </Label>
    <Input
 id="price"
 name="price"
 type="number"
 placeholder="Enter Product Cost"
 value={productdata.price.toString()} 
 onChange={handleNumberChange}
 className={` ${productdata.price ? 0 : 'border-red-500'}`}
/>

 </div>

 <div className="grid gap-1">
    <Label className="text-sm" htmlFor="stock">
      Stock
    </Label>
    <Input
 id="stock"
 name="stock"
 type="number"
 placeholder="Enter Stock Count"
 value={productdata.stock.toString()} 
 onChange={handleNumberChange}
 className={` ${productdata.stock ? 0 : 'border-red-500'}`}
/>

 </div>


 <div className="grid gap-1">
      <Label className="text-sm" htmlFor="Available">
        Available
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300">
          {productdata.available ? 'True' : 'False'}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>is Available</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDropdown(true)}>True</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDropdown(false)}>False</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
</form>

            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-black text-white" variant="outline">Submit</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                 <AlertDialogTitle>Confirm Product Details</AlertDialogTitle>
                 <AlertDialogDescription>
                    Reward Name:{productdata.name}<br />
                   Reward Cost:{productdata.price.toString()} <br />
                   Stock Count:{productdata.stock.toString()}<br />
                   Available: {productdata.available.toString()}<br/>

                    Double check if necessary.
                 </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                 <AlertDialogAction onClick={updateDatabase}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </main>
      </div>
    </div>
 );
}


