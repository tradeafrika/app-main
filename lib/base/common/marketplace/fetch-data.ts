import { supabaseClientMain } from "../../supabase";

/**
 * Used to fetch all marketplace products for the UI.
 */

export async function fetchMarketPlaceProducts() {
    try {
        const { data, error } = await supabaseClientMain
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

    } catch (err) {
        console.log('Error fetching Marketplace products')
    }
}