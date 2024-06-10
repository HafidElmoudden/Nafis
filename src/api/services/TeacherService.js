import { supabase } from "api/SupabaseClient";

export const addTeacherToSchool = async (schoolCode, data) => {
    try {
      const { email, permissions, class: classIds } = data;
  
      const { error } = await supabase.from('school_teachers').insert([
        {
          email: email,
          school_code: schoolCode,
          permissions: JSON.stringify(permissions),
          assigned_classes: classIds
        },
      ]);
  
      if (error) {
        console.error('Error inserting data:', error);
        alert('Failed to save teacher. Please try again.');
      } else {
        alert('Teacher saved successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

export const getSchoolTeachers = async (schoolCode) => {
    try {
      const { data, error } = await supabase
        .from('school_teachers')
        .select('*')
        .eq('school_code', schoolCode);
  
      if (error) {
        console.error('Error getting teachers:', error);
      }
  
      return { data, error };
    } catch (error) {
      console.error('Error:', error);
    }
}