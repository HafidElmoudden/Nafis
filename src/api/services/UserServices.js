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

export const verifyModeratorIsSchoolCoordinator = async (userId) => {
    const { data, error } = await supabase.from('schools').select('*').eq('nafis_coordinator', userId);
    return { data, error };
}

export const changeUserType = async (userId, userType) => {
    console.log("changeUserType userId: ", userId, "userType: ", userType);

    // const { data, error } = await supabase.auth.updateUser({
    //     data: {
    //         user_type: userType
    //     }
    // });

    const { data, error } = await supabase.from('users').update({
        user_type: userType
    }).eq('id', userId);

    // if (error) {
        console.error('Error updating user type:', error);
        console.log("Data change user type: ", data);
    // }

    return { data, error };
}