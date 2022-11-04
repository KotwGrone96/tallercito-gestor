import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/eltallercitogestor/dashboard');
  };

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
                    required
                    placeholder='********'
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md     focus:border-blue-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>
                <div className='mt-6'>
                  <button
                    type='submit'
                    className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50'
                  >
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
