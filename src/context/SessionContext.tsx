import { createContext, useState, useEffect } from 'react';
import { Props, UserProps, FetchResponse } from '../vite-env';
import { getCookie } from 'react-use-cookie';
import simpleFetchPost from '../helpers/simpleFetchPost';
import { useNavigate } from 'react-router-dom';

interface context {
  alreadyLogged: boolean;
  userSession: { user: string; pass: string };
  setAlreadyLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUserSession: React.Dispatch<React.SetStateAction<{ user: string; pass: string }>>;
}

export const SessionContext = createContext<context | null>(null);

export const SessionContextProvider = ({ children }: Props) => {
  const initialUserSession = {
    user: '',
    pass: '',
  };

  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const [userSession, setUserSession] = useState(initialUserSession);
  const value: context = { alreadyLogged, setAlreadyLogged, userSession, setUserSession };
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      const userCookie = getCookie('userData');
      if (userCookie === '') {
        setTimeout(() => {
          navigate('/eltallercitogestor');
        }, 2000);
        return;
      }
      const res: FetchResponse = await simpleFetchPost(
        userCookie,
        'http://localhost:80/tallercito/login.php'
      );
      if (!res.ok) {
        window.alert(res.msg);
        return;
      }
      const userData: UserProps = JSON.parse(userCookie);
      setUserSession(userData);
      setAlreadyLogged(true);
    };

    verifyCookie();
  }, []);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
