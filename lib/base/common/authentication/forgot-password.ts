/**
 * Used in the case when the user forgets the password
 * 
 * This has two stages . when the user says he forgot the password, 
 * 
 * direct them to check their email
 */

import { supabaseClientMain } from "@/lib/base/supabase"

/**
 * Reset the password.
 */


interface IResetPassword {
    redirectLink: string;
}

/**
 * Reset the user password
 * @param options 
 */
export async function resetPassword(options:IResetPassword) {

    const {data : {user}} = await supabaseClientMain.auth.getUser();
    await supabaseClientMain.auth.resetPasswordForEmail(user!.email!, { redirectTo: options.redirectLink, })
}

interface IUpdatePassword {
    password:string;
}

/**
 * 
 * Update the current password
 * @param options 
 * @returns 
 */

export async function updateUserPassword(options:IUpdatePassword) {
   return supabaseClientMain.auth.updateUser({  password: options.password})
}