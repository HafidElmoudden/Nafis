import { useEffect } from 'react';
import useSession from 'hooks/useSession';
import { atom, useAtom } from 'jotai';

const userAtom = atom(null);

const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const session = useSession();

  useEffect(() => {
    if (session) {
      setUser((session as any)?.user);
    }
  }, [session, setUser]);

  return user;
};

export default useUser;
