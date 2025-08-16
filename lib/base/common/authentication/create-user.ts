
/**
 * Used for adding a new user to the database(Create Account for the user)
 */

import { supabaseClientMain } from "@/lib/base/supabase";

export interface ICreateNewUser {
    email: string;
    password: string;
    firstName: string;
    redirectURL: string;
    secondName: string;
}

export async function createNewUser(options: ICreateNewUser) {


    const { data, error } = await supabaseClientMain.auth.signUp({
        email: options.email,
        password: options.password,
        options: {
            data : {
                first_name : options.firstName,
                second_name : options.secondName
            },
            /**
             * The User will land here after clicking the confirmation Link 
             * set to their Email.
             */
            emailRedirectTo: options.redirectURL// user lands here after clicking confirm link
        }
    })

    if (error) {
        console.error('Signup error:', error.message)
        return
    }

    console.log('Signup success:', data)
}