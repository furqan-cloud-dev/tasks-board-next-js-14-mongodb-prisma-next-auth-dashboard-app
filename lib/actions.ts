// src/lib/actions.ts
"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { Task } from "./models";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./utilities";


const prisma = new PrismaClient()


const schemaCreateUser = z.object({
  name: z.string(),
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
  password: z.string(),
})


export async function createUser(prevState: any, formData: FormData) {
  const validatedFields = schemaCreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    // If user is found, throw an error
    if (user) {
      return {
        message: 'user already exists'
      }
    }

    const hashedPassword = await hashPassword(password);

    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    });

    if (createUser) {
      console.log({ createUser })
    }

  } catch (error: any) {
    console.log(error);
    return {
      message: error.message
    }

    /* When an error is thrown, it'll be caught by the nearest error.js or <Suspense> boundary on the client */
    //throw new Error('Failed to create user') 
  }

  revalidatePath("/login");
  redirect("/login");
}

/*
const registerUser = async (formData: FormData) => {
  'use server';

  // const { name, email, password } = Object.fromEntries(formData);
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
      const user = await prisma.user.findUnique({ where: { email: email } });
      // If user is found, throw an error
      if (user) {
          console.log({ user });
          setCustomError("user already exists");
          return;
      }

      const createUser = await prisma.user.create({
          data: {
              name: name,
              email: email,
              password: password
          }
      });
      if (createUser) {
          revalidatePath("/login");
      }

  } catch (error: any) {
      console.log(error);
      setCustomError("failed to create user");
  }
};
*/




export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      // return error.message;
      return 'login failed'
    }
    throw error;
  }
}


export async function googleAuthenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('google');
  } catch (error) {
    if (error instanceof AuthError) {
      return 'google log in failed'
    }
    throw error;
  }
}

/*
export async function addTask(formData: FormData) {
  const { title } = formData;

  try {
    const newTask: Task = {
      id: "1",
      title: title,
      status: ""
    };

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};
*/


