import { useAtom } from "jotai";
import useSession from "./useSession";
import { userAtom } from "atoms/userAtom";
import { useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const session = useSession();

  useEffect(() => {
    if (session) {
      setUser((session)?.user);
    }
  }, [session, setUser]);

  return user;
};

export const useUserType = () => {
  const user = useUser();
  return user?.user_metadata?.user_type;
  ;
};

export default useUser;
