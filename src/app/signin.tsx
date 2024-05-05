'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { firebasedb, app } from "../../firebaseconfig"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { getDoc, doc } from 'firebase/firestore'

const auth = getAuth(app)

interface iUser {
  name: string;
  email: string;
  last: string;
  type: string;

}


export default function SigninAdmin() {

  const router = useRouter()

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful");
      console.log("User Logged In with: ", userCredential);
      console.log("User Logged In with: ", userCredential.user.uid);
      sessionStorage.setItem("User", userCredential.user.uid);

      // Check if the user is an admin
      const userRef = doc(firebasedb, 'UserList', userCredential.user.uid); // Assuming 'UserList' is your collection name
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.type === 'Admin') {
          // Redirect to dashboard if the user is an admin
          router.push("/dashboard");
        } else {
          // Show alert if the user is not an admin
          alert('User type is not admin.');
        }
      } else {
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.log("User Not Registered");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[400px]">
      <div className="w-full max-w-[400px] grid gap-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Mikee's Curtain</h1>
          <p className="text-gray-500 dark:text-gray-400">Admin Dashboard</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="@example.com"
            value={email}
            onChange={e => setemail(e.target.value)} // uses to change the value of first name
            type="email"
            required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setpassword(e.target.value)} // uses to change the value of first name
            type="password"
            required />
        </div>
        <Button className="w-full" onClick={handleSubmit}>Sign In</Button>
      </div>
      <div className="text-center text-sm text-blue-500">
        <p className="text-gray-500 dark:text-gray-400">
          Don't have an admin account?
          <Link className="underline" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

