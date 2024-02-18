import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// import * as argon2 from "argon2";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// export async function hashStringValue(value: string): Promise<string> {
//   try {
//     const hashed = await argon2.hash(value);
//     return hashed;
//   } catch (err) {
//     console.log(err);
//     return value;
//   }
// }
