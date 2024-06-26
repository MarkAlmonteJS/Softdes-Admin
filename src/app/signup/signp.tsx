"use client"
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/1Bvw9WX11pC
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { firebasedb, app } from "../../../firebaseconfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react"
const auth = getAuth(app)



interface iUser {
  name: string;
  email: string;
  last: string;
  type: string;

}


export function Signup() {

  const [admindata, setadmindata] = useState<iUser>({
    name: '',
    email: '',
    last: '',
    type: '',

  });

  const [password, setpassword] = useState('')
  const handleRegister = async (event: any) => {
    event.preventDefault();

    try {
      // User registration with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, admindata.email, password);
      console.log("Register Successful");
      console.log("User Registered with: ", userCredential.user.uid);

      // After successful registration, update the database
      const adminData = {
        name: admindata.name,
        email: admindata.email,
        last: admindata.last,
        type: 'Admin',
      };

      // Define the collection
      const myCollection = collection(firebasedb, 'UserList');

      // Prepare the data to store
      const dataToStore = {
        ...adminData,
      };

      // Add the document to the collection and get the auto-generated ID
      const newDocRef = await addDoc(myCollection, dataToStore);

      // Update the document to include the auto-generated ID in the 'id' field
      await setDoc(doc(firebasedb, 'UserList', userCredential.user.uid), {
        ...dataToStore,
        id: userCredential.user.uid
      });

      console.log('Admin added with ID:', userCredential.user.uid);
      alert("Admin successfully added!"); // This message might not be relevant here, consider updating it
    } catch (error) {
      console.error("Error adding admin or registering user: ", error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="border-b">
        <div className="container flex items-center justify-between h-14 px-4 sm:px-6 md:px-10">
          <nav className="hidden font-medium text-sm text-gray-500 sm:flex dark:text-gray-400">
          </nav>
          <nav className="flex items-center gap-4 text-sm font-medium dark:text-gray-400">
            <Link className="underline-off" href="/">
              Home
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-sm space-y-6">
        <div className="flex flex-col items-center mt-10">
          <img src="/Assets/logo2.jpeg" alt="Company Logo" className="h-20 w-auto mb-4" />
          <h1 className="text-4xl font-bold mt-10">Mikee's Curtain</h1>
        </div>
        <div className="tx-5 space-y-2 text-center">
          <h2 className="text-3xl font-bold">Admin sign Up</h2>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Enter your information to create an Admin account</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              id="name"
              placeholder="Enter your First name"
              value={admindata.name}
              onChange={e => setadmindata({ ...admindata, name: e.target.value })}
              type="text"
              required />
          </div>
          <div>
            <Label htmlFor="last" className="">Last Name</Label>
            <Input
              id="last"
              placeholder="Enter your Last name"
              value={admindata.last}
              onChange={e => setadmindata({ ...admindata, last: e.target.value })}
              type="text"
              required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your Email"
              value={admindata.email}
              onChange={e => setadmindata({ ...admindata, email: e.target.value })}
              type="text"
              required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Type your password"
              type="password"
              value={password}
              onChange={e => setpassword(e.target.value)}
              required />
          </div>
          <Button onClick={handleRegister} className="w-full">Sign Up</Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link className="underline" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

}
