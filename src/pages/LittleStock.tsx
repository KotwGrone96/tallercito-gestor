import img from './../assets/product.jpg';

export default function LittleStock() {
  return (
    <>
      <div className='w-full'>
        <div className='w-full'>
          <h2 className='p-4 lg:pl-10 lg:pt-6 font-semibold italic text-2xl text-purple-900 lg:text-3xl'>
            Poco Stock
          </h2>
          <div className='w-full m-auto p-4 flex justify-center flex-col items-center gap-4 lg:flex-row lg:flex-wrap'>
            {/* CARD ITEM */}
            <div className='w-full bg-violet-200 rounded-lg p-2 max-w-xl shadow-lg lg:max-w-xs'>
              <div className='flex items-center'>
                <img
                  src={img}
                  className='w-10 h-10 rounded-full overflow-hidden md:w-12 md:h-12'
                  alt='product'
                />
                <h3 className='pl-3 font-semibold md:text-lg'>Disfraz Superman</h3>
              </div>
              <p className='pl-14 md:text-lg'>
                SKU : <span>#545</span>
              </p>
              <p className='pl-14 text-red-700 md:text-lg'>
                Cantidad : <span>5</span>
              </p>
              <button className='bg-violet-700 ml-14 mt-2 px-2 text-white rounded-lg hover:bg-violet-500 md:text-lg'>
                Editar
              </button>
            </div>
            <div className='w-full bg-violet-200 rounded-lg p-2 max-w-xl shadow-lg lg:max-w-xs'>
              <div className='flex items-center'>
                <img
                  src={img}
                  className='w-10 h-10 rounded-full overflow-hidden md:w-12 md:h-12'
                  alt='product'
                />
                <h3 className='pl-3 font-semibold md:text-lg'>Disfraz Superman</h3>
              </div>
              <p className='pl-14 md:text-lg'>
                SKU : <span>#545</span>
              </p>
              <p className='pl-14 text-red-700 md:text-lg'>
                Cantidad : <span>5</span>
              </p>
              <button className='bg-violet-700 ml-14 mt-2 px-2 text-white rounded-lg hover:bg-violet-500 md:text-lg'>
                Editar
              </button>
            </div>
            <div className='w-full bg-violet-200 rounded-lg p-2 max-w-xl shadow-lg lg:max-w-xs'>
              <div className='flex items-center'>
                <img
                  src={img}
                  className='w-10 h-10 rounded-full overflow-hidden md:w-12 md:h-12'
                  alt='product'
                />
                <h3 className='pl-3 font-semibold md:text-lg'>Disfraz Superman</h3>
              </div>
              <p className='pl-14 md:text-lg'>
                SKU : <span>#545</span>
              </p>
              <p className='pl-14 text-red-700 md:text-lg'>
                Cantidad : <span>5</span>
              </p>
              <button className='bg-violet-700 ml-14 mt-2 px-2 text-white rounded-lg hover:bg-violet-500 md:text-lg'>
                Editar
              </button>
            </div>
            <div className='w-full bg-violet-200 rounded-lg p-2 max-w-xl shadow-lg lg:max-w-xs'>
              <div className='flex items-center'>
                <img
                  src={img}
                  className='w-10 h-10 rounded-full overflow-hidden md:w-12 md:h-12'
                  alt='product'
                />
                <h3 className='pl-3 font-semibold md:text-lg'>Disfraz Superman</h3>
              </div>
              <p className='pl-14 md:text-lg'>
                SKU : <span>#545</span>
              </p>
              <p className='pl-14 text-red-700 md:text-lg'>
                Cantidad : <span>5</span>
              </p>
              <button className='bg-violet-700 ml-14 mt-2 px-2 text-white rounded-lg hover:bg-violet-500 md:text-lg'>
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
