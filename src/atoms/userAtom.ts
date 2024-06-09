import { useEffect } from 'react';
import useSession from 'hooks/useSession';
import { atom, useAtom } from 'jotai';

export const userAtom = atom(null);

