/**
 * 
 * Used for checking and verifying the user one more time after the confirmation Link
 */

import { supabaseClientMain } from "@/lib/base/supabase";


export async function checkAndVerfiyUserViaLink() {

    const { data : {user}} = await supabaseClientMain.auth.getUser()

    if(user?.email_confirmed_at){
        return true;
    }else{
        return false;
    }

}