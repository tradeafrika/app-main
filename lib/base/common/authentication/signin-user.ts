/**
 * Used to sign In the user 
 */


import { supabaseClientMain } from "@/lib/base/supabase";


/**
 * Used to Sign In User the normal Way
 */

interface ISignInUser {
    email:string;
    password:string;
}

export async function signInUser(options:ISignInUser) {
    const { data, error } = await supabaseClientMain.auth.signInWithPassword
        ({
            email: options.email,
            password: options.password,
        })

        if(error){
            console.log("Error Signing user...")
        }
}

/**
 * Sign In user with provider
 */

interface IGoogleAuthentication {
    redirectURL:string;
}

export async function signInWithGoogle(options:IGoogleAuthentication) {
    const { data, error } = await supabaseClientMain.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: options.redirectURL
        }
    })

    if (error) {
        console.error('Google login error:', error.message)
    } else {
        console.log('Redirecting to Google login...', data)
    }
}