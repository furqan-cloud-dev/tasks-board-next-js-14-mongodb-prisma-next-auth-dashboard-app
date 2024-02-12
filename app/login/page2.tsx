// src/app/login/page.tsx
"use client"

import { authenticate, googleAuthenticate } from "@/lib/actions"
import { useFormState } from "react-dom"

export default function LoginPage() {
    const [errorMsg, dispatch] = useFormState(authenticate, undefined)
    const [errorMsgGoogle, dispatchGoogle] = useFormState(googleAuthenticate, undefined) //googleAuthenticate hook
    return (
        <div>
            <h1>Log in Page</h1>
            <form className="flex flex-col" action={dispatch}>
                <input className="bg-blue-300 text-black" name="id"></input>
                <input className="bg-yellow-300 text-black" name="password" type="password"></input>
                <button className="text-orange-600">
                    Log In
                </button>
                <p>{errorMsg}</p>
            </form>
            <br />
            <form className="flex flex-col" action={dispatchGoogle}>
                <button className="text-sky-400">
                    Google Sign In
                </button>
                <p>{errorMsgGoogle}</p>
            </form>

        </div>
    )
}