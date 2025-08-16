/**
 * Used to check for an available Logged In Session
 * 
 * Check if their is a current user session that is available.
 * 
 * this provides a user.Data check if its null to verify the user is available
 */

import { supabaseClientMain } from "@/lib/base/supabase";

export async function checkCurrentUserSession() {
    return supabaseClientMain.auth.getUser();
}

