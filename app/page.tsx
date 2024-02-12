// src/app/page.tsx
import { auth, signOut, unstable_update } from "@/auth"
import { User } from "next-auth";

export default async function Home() {
  console.log('Server Side Rendering')
  const session = await auth() // calling session
  const user = session?.user;
  console.log(session);
  console.log(user);

  return (
    <div>
      <h1 className="text-orange-600">Home Page</h1>
      <h2>Unavailable without auth</h2>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="text-orange-600">
          Log Out
        </button>
      </form>
    </div>
  )
}