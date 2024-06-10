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
            num_third_class: school.num_third_class,
            num_sixth_class: school.num_sixth_class,
            num_third_mid_class: school.num_third_mid_class,
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

export const getSchoolInformationsForModerator = async (userId) => {
    if(!userId) return console.error('getSchoolInformationsForModerator: User ID is required')
    try {
        const { data, error } = await supabase
            .from('schools')
            .select('*')
            .eq('nafis_coordinator', userId)
            .single()

        if (error) {
            console.error('Error getting school:', error.message);
        }
        return { data, error };
    } catch (error) {
        console.error('Error getting school:', error.message);
    }
}

export const getSchoolClasses = async (schoolId) => {
    try {
        const { data, error } = await supabase
            .from('school_classes')
            .select('*')
            .eq('school_code', schoolId)

        if (error) {
            console.error('Error getting classes:', error.message);
        }

        return { data, error };
    } catch (error) {
        console.error('Error getting classes:', error.message);
    }
}