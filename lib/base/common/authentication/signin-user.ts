/**
 * Used to sign In the user
 */

import { supabaseClientMain } from '@/lib/base/supabase'

/**
 * Used to Sign In User the normal Way
 */

interface ISignInUser {
    email: string
    password: string
}

interface ISiginInResponse {
    isErrorTrue: boolean
    isDataAvailable: boolean
    data: any
    errorMessage: string
}

export async function signInUser(options: ISignInUser): Promise<ISiginInResponse> {
    const { data, error } = await supabaseClientMain.auth.signInWithPassword({
        email: options.email,
        password: options.password,
    })

    if (error) {
        return {
            data: {},
            errorMessage: error.message,
            isDataAvailable: false,
            isErrorTrue: true,
        }
    } else {
        return {
            data: data,
            errorMessage: '',
            isDataAvailable: true,
            isErrorTrue: false,
        }
    }
}

/**
 * Sign In user with provider
 */

interface IGoogleAuthentication {
    redirectURL: string
}

export async function signInWithGoogle(options: IGoogleAuthentication): Promise<ISiginInResponse> {
    const { data, error } = await supabaseClientMain.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: options.redirectURL,
        },
    })

    if (error) {
        return {
            data: {},
            errorMessage: error.message,
            isDataAvailable: false,
            isErrorTrue: true,
        }
    } else {
        return {
            data: data,
            errorMessage: '',
            isDataAvailable: true,
            isErrorTrue: false,
        }
    }
}
