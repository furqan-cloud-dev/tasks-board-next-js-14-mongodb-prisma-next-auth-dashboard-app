'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Loader2 } from "lucide-react"


export function SubmitButton({ title }: { title: string }) {
    const { pending } = useFormStatus()

    return (
        <>
            {pending ? (
                <Button className="w-full" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>) : (
                <Button className="w-full" type="submit">
                    {title}
                </Button>
            )
            }

        </>
    )
}