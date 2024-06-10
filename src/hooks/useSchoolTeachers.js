import { getSchoolTeachers } from "api/services/TeacherService";
import { schoolTeachersAtom } from "atoms/schoolTeachersAtom";
import { useAtom } from "jotai";
import React from "react";

export const useSchoolTeachers = (schoolCode) => {
    const [data, setSchoolTeachers] = useAtom(schoolTeachersAtom);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchSchoolTeachers = async () => {
            setLoading(true);
            try {
                const { data, error } = await getSchoolTeachers(schoolCode);
                if (error) {
                    setError(error);
                }
                if (data) {
                    setSchoolTeachers(data);
                }
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchSchoolTeachers();
    }, [schoolCode]);

    if (!schoolCode) return;
    return { data, loading, error };
}