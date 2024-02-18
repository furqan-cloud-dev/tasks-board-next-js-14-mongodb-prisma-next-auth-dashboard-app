// User Registration
"use client"

import { createUser } from "@/lib/actions"
import { useFormState } from "react-dom"
import { SubmitButton } from "../../components/buttons/submit-button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"


const initialState = {
    message: '',
}

export default function SignUpPage() {
    const [state, formAction] = useFormState(createUser, initialState)

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-10">TasksBoard</h1>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
                    <CardDescription>Enter your name, email and password to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="name" type="text" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="user@domain.com" type="email" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" placeholder="password" type="password" required />
                            </div>
                            <SubmitButton title="Sign up" />
                            <div className="text-center flex justify-center">
                                <p className="text-red-500">{state.message}</p>
                            </div>
                        </div>
                    </form>
                    <div className="mt-10 text-center">
                        Already have an account? <a className="text-blue-500 underline" href="/login">Login</a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}