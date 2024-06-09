import { getSchoolInformationsForModerator } from "api/services/SchoolServices";
import React from "react";
import useUser from "./useUser";

export const useSchool = () => {
    const [school, setSchool] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const user = useUser();

    React.useEffect(() => {
        const fetchSchool = async () => {
            setLoading(true);
            try {
                const { data, error } = await getSchoolInformationsForModerator(user.id);
                if (error) {
                    setError(error);
                }
                if (data) {
                    setSchool(data);
                }
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchSchool();
    }, [user]);

    return { school, loading, error };
}