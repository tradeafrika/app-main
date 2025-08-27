/**
 * This will be used to store all the company details including the associate with the user
 *
 * This will need the current user to have been created and then we can associate the company details
 * to the user
 */

import { supabaseClientMain } from '@/lib/base/supabase'
import { User } from '@supabase/supabase-js'
import { Session } from 'inspector/promises'



interface ICreateUserWithCompany  {
    userFirstName: string
    userSecondName: string
    userEmail: string
    userPassword: string
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

export async function createNewUserWithCompanyProfile(
    options: ICreateUserWithCompany
): Promise<ICreateNewUserResponse> {
    const {
        data: { user },
        error,
    } = await supabaseClientMain.auth.signUp({
        email: options.userEmail,
        password: options.userPassword,
        options: {
            data: {
                first_name: options.userFirstName,
                second_name: options.userSecondName,
            },
        },
    })

    if (error) {
        return {
            data: user,
            errorMessage: error!.message,
            isErrorTrue: true,
        }
    } else {
        return {
            data: user,
            errorMessage: '',
            isErrorTrue: false,
        }
    }
}
