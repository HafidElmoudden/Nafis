import { supabase } from "api/SupabaseClient"

export const addSchool = async (school, userId) => {
    try {
        const { error } = await supabase.from('schools').insert({
            school_code: school.school_code,
            school_name: school.school_name,
            educational_administration: school.educational_administration,
            educational_office: school.educational_office,
            school_principal: school.school_principal,
            academic_year: school.academic_year,
            semester: school.semester,
            previous_nafis_grade: school.previous_nafis_grade,
            nafis_coordinator: userId,
        });

        if (error) {
            console.error('Error inserting school:', error.message);
        }
        return { error };
    } catch (error) {
        console.error('Error inserting school:', error.message);
    }

}