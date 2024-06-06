import { supabase } from "api/SupabaseClient";

export const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    return { data, error };
}

export const signUpUser = async (fullName, email, password, birthDate, phoneNumber) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullName,
                birth_date: birthDate,
                phone_number: phoneNumber
            }
        }
    });
    return { data, error };
}