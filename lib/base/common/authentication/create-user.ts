/**
 * Used for adding a new user to the database(Create Account for the user)
 */

import { supabaseClientMain } from '@/lib/base/supabase'
import { User } from '@supabase/supabase-js'
import { Session } from 'inspector/promises'

export interface ICreateNewUser {
    email: string
    password: string
    firstName: string
    redirectURL: string
    secondName: string
}
type ct =
    | {
          user: User | null
          session: Session | null
      }
    | {
          user: null
          session: null
      }
interface ICreateNewUserResponse {
    errorMessage: string
    isErrorTrue: boolean
    data: ct | any
}

export async function createNewUser(options: ICreateNewUser): Promise<ICreateNewUserResponse> {
    const { data, error } = await supabaseClientMain.auth.signUp({
        email: options.email,
        password: options.password,
        options: {
            data: {
                first_name: options.firstName,
                second_name: options.secondName,
            },
            /**
             * The User will land here after clicking the confirmation Link
             * set to their Email.
             */
            emailRedirectTo: options.redirectURL, // user lands here after clicking confirm link
        },
    })

    if (error) {
        return {
            data: '',
            errorMessage: error.message,
            isErrorTrue: true,
        }
    }

    return {
        data: data,
        errorMessage: '',
        isErrorTrue: false,
    }
}
