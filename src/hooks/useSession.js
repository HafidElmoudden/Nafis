import { supabase } from "api/SupabaseClient";
import { useEffect, useState } from "react";

const useSession = () => {
    const [session, setSession] = useState(null);
    
    useEffect(() => {
        const getSession = async () => {
            const {data: { session }} = await supabase.auth.getSession();
            setSession(session);
        };
    
        getSession();
    }, []);
    
    return session;
}

export default useSession