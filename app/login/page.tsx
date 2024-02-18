/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1ADs2FRNaQg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authenticate, googleAuthenticate } from "@/lib/actions"
import { useFormState } from "react-dom"
import { SubmitButton } from "@/components/buttons/submit-button"

export default function LoginPage() {
    const [errorMsg, dispatch] = useFormState(authenticate, undefined)
    const [errorMsgGoogle, dispatchGoogle] = useFormState(googleAuthenticate, undefined) //googleAuthenticate hook


    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-10">TasksBoard</h1>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={dispatch}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="id" placeholder="user@domain.com" type="email" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" placeholder="password" type="password" required />
                            </div>
                            <SubmitButton title="Login" />
                            <div className="text-center flex justify-center">
                                <p className="text-red-500">{errorMsg}</p>
                            </div>
                        </div>
                    </form>
                    <div className="mt-10 text-center">
                        Dont have an account <a className="text-blue-500 underline" href="/signup">Sign up</a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

