import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import simpleFetchPost from '../helpers/simpleFetchPost';
import { FetchResponse } from '../vite-env';
import { SessionContext } from '../context/SessionContext';
import { setCookie } from 'react-use-cookie';

export default function Login() {
  const initialLoginForm = {
    user: '',
    pass: '',
  };
  const { setAlreadyLogged, setUserSession, alreadyLogged } = useContext(SessionContext)!;
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res: FetchResponse = await simpleFetchPost(
      JSON.stringify(loginForm),
      'http://localhost:80/tallercito/login.php'
    );
    if (!res.ok) {
      window.alert(res.msg);
      setIsLoading(false);
      return;
    }
    setUserSession(loginForm);
    setAlreadyLogged(true);
    setCookie('userData', JSON.stringify(loginForm));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!alreadyLogged) return;
    setIsLoading(false);
    navigate('/eltallercitogestor/dashboard/todos');
  }, [alreadyLogged]);

  return (
    <div className='lg:bg-purple-900 lg:bg-none bg-bglogin bg-center bg-fixed bg-cover bg-no-repeat relative'>
      <div className='lg:hidden absolute top-0 left-0 w-full h-screen bg-gray-900/50 backdrop-blur-xs'></div>
      <div className='flex justify-center h-screen relative z-50'>
        <div className='hidden bg-cover lg:block lg:w-2/3 bg-bglogin'>
          <div className='flex items-center h-full px-20 bg-gray-900 bg-opacity-40'>
            <div>
              <h2 className='text-4xl font-bold text-white'>El Tallercito Cotillón</h2>
              <p className='max-w-xl mt-3 text-gray-300'>Gestor de productos y control de stock.</p>
            </div>
          </div>
        </div>
        <div className='flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6'>
          <div className='flex-1'>
            <div className='text-center'>
              <h2 className='text-4xl font-bold text-center text-white '>El Tallercito</h2>
              <p className='mt-3 text-white '>Inicio de Sesión</p>
            </div>
            <div className='mt-8'>
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='text'
                    className='block mb-2 text-sm text-white '
                  >
                    Usuario
                  </label>
                  <input
                    type='text'
                    name='user'
                    id='text'
                    onChange={handleChange}
                    required
                    placeholder='eltallercito123'
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md     focus:border-blue-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>
                <div className='mt-6'>
                  <div className='flex justify-between mb-2'>
                    <label
                      htmlFor='pass'
                      className='text-sm text-white '
                    >
                      Contraseña
                    </label>
                  </div>
                  <input
                    type='password'
                    name='pass'
                    id='pass'
                    onChange={handleChange}
                    required
                    placeholder='********'
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md     focus:border-blue-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>
                <div className='mt-6'>
                  {!isLoading ? (
                    <button
                      type='submit'
                      className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50'
                    >
                      Ingresar
                    </button>
                  ) : (
                    <div
                      role='status'
                      className='w-full px-4 py-2 tracking-wide bg-transparent flex justify-center items-center gap-2'
                    >
                      <svg
                        aria-hidden='true'
                        className='mr-2 w-8 h-8 text-white animate-spin fill-purple-700'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
