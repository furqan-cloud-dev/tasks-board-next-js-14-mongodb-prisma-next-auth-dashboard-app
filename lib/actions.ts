// src/lib/actions.ts
"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";
import { AuthError, User } from "next-auth";
import { PrismaClient } from "@prisma/client";
// import { hashStringValue } from "./utils";
import { schemaCreateUser, schemaCreateTask } from "./validations";
import * as argon2 from "argon2";



const prisma = new PrismaClient()


async function hashStringValue(value: string): Promise<string> {
  try {
    const hashed = await argon2.hash(value);
    return hashed;
  } catch (err) {
    console.log(err);
    return value;
  }
}


export async function createUser(prevState: any, formData: FormData) {
  const validatedFields = schemaCreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
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

    const hashedPassword = await hashStringValue(password);

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


export async function createTask(prevState: any, formData: FormData) {
  const validatedFields = schemaCreateTask.safeParse({
    title: formData.get('title')
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string

  const session = await auth() // calling session
  const userId: string = session?.user?.id ?? "";
  console.log("create user:", { userId });

  try {
    const createdTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        userId: userId
      }
    });

    if (createdTask) {
      console.log({ createdTask })
    }

  } catch (error: any) {
    console.log(error);
    return {
      message: error.message
    }
  }

  revalidatePath("/dashboard/tasks");
  return {
    message: 'success'
  }

  // revalidatePath("/dashboard/tasks");
  // redirect("/dashboard/tasks");
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


