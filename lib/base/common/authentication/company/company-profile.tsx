import { supabaseClientMain } from '@/lib/base/supabase'
import { User } from '@supabase/supabase-js'

interface IProfileInitial {
    company_name: string
    phone_number: string
    country: string
}

interface IProfile extends Partial<IProfileInitial> {
    userFirstName: string
    userSecondName: string
    userEmail: string
    trade_role: 'buyer' | 'supplier' | 'both'
}

export async function createCompanyProfile(user: User, options: IProfile) {
    // 1. Check if profile already exists
    const { data: existingProfile, error: selectError } = await supabaseClientMain
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

    if (selectError && selectError.code !== 'PGRST116') {
        // PGRST116 = "No rows found" (normal if profile doesn't exist)
        console.error('Error checking profile:', selectError.message)
        throw selectError
    }

    if (existingProfile) {
        console.log('Profile already exists for user:', user.id)
        return existingProfile
    }

    // 2. Insert new profile
    const { data, error: insertError } = await supabaseClientMain
        .from('profiles')
        .insert({
            id: user.id,
            trade_role: options.trade_role,
            company_name: options.company_name,
            first_name: options.userFirstName,
            last_name: options.userSecondName,
            phone: options.phone_number,
        })
        .select()
        .single()

    if (insertError) {
        console.error('Insert error:', insertError.message)
        throw insertError
    }

    return data
}
