import { getSchoolClasses } from "api/services/SchoolServices";
import { schoolClassesAtom } from "atoms/schoolClassesAtom";
import { useAtom } from "jotai";
import React from "react";

export const useSchoolClasses = (schoolCode) => {
    const [schoolClasses, setSchoolClasses] = useAtom(schoolClassesAtom);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchSchoolClasses = async () => {
            setLoading(true);
            try {
                const { data, error } = await getSchoolClasses(schoolCode);
                if (error) {
                    setError(error);
                }
                if (data) {
                    data.reduce((acc, item) => {
                        if (!acc[item.class_level]) {
                            acc[item.class_level] = 0;
                        }
                        acc[item.class_level] += 1;

                        let label;
                        if (item.class_level == 1) label = "الصف الثالث";
                        if (item.class_level == 2) label = "الصف السادس";
                        if (item.class_level == 3) label = "الصف الثالث المتوسط";

                        item.class_label = `${label} - ${acc[item.class_level]}`;

                        return acc;
                    }, {});
                    setSchoolClasses(data);
                }
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchSchoolClasses();
    }, [schoolCode]);

    if (!schoolCode) return;
    return { schoolClasses, loading, error };
}