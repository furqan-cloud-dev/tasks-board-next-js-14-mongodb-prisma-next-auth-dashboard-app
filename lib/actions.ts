// src/lib/actions.ts
"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { Task } from "./models";

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