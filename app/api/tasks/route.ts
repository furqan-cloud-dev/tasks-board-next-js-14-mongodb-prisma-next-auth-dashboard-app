import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function GET(request: Request) {
    const session = await auth() // calling session
    const user = session?.user;

    const tasks = await prisma.task.findMany({
        where: { userId: user?.id },
        orderBy: [
            {
                createdAt: 'desc',
            }
        ]
    });

    return NextResponse.json(tasks);
}