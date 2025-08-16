/**
 * This will be used to store all the company details including the associate with the user
 * 
 * This will need the current user to have been created and then we can associate the company details
 * to the user
 */

import { supabaseClientMain } from "@/lib/base/supabase";

interface ICompany {
    country: string;
    trade_role: "buyer" | "seller" | "both",
    company_name: string;
    company_email: string;
    phone_number: number;
    did_accept_terms: boolean
}

interface ICreateUserWithCompany extends ICompany {
    userFirstName: string,
    userSecondName: string,
    userEmail: string;
    userPassword: string;
}

/**
 * 
 * Create new USer with company profile but used a google provider
 * @param options 
 */

export async function createNewUserWithCompanyProfileWithProvider(options: ICreateUserWithCompany) {


    const {data : {user}} = await supabaseClientMain.auth.getUser()

    if (user) {
        await supabaseClientMain.from('profiles').insert({
            id: user.id,
            country: options.country,
            trade_role: options.trade_role,
            company_name: options.company_name,
            company_email: options.company_email,
            first_name: options.userFirstName,
            last_name: options.userSecondName,
            phone_number: options.phone_number,
            accept_terms: options.did_accept_terms
        })
    }

}
