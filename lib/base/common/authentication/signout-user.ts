import { supabaseClientMain } from "@/lib/base/supabase";

/**
 * Used to sign out the user
 */

export async function signOutUser() {
    const { error } = await supabaseClientMain.auth.signOut()    

    if(error && error != null) {

        console.log('Error signing out the current user')

    }

}