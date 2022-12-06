export default function TableSkeleton() {
  return (
    <div
      role='status'
      className='p-4 space-y-4 w-full rounded border border-gray-200 divide-y divide-gray-200 shadow animate-pulse md:p-6'
    >
      <div className='flex justify-between items-center'>
        <div>
          <div className='h-2.5 bg-violet-300 rounded-full  w-24 mb-2.5' />
          <div className='w-32 h-2 bg-violet-200 rounded-full ' />
        </div>
        <div className='h-2.5 bg-violet-300 rounded-full  w-12' />
      </div>
      <div className='flex justify-between items-center pt-4'>
        <div>
          <div className='h-2.5 bg-violet-300 rounded-full  w-24 mb-2.5' />
          <div className='w-32 h-2 bg-violet-200 rounded-full ' />
        </div>
        <div className='h-2.5 bg-violet-300 rounded-full  w-12' />
      </div>
      <div className='flex justify-between items-center pt-4'>
        <div>
          <div className='h-2.5 bg-violet-300 rounded-full  w-24 mb-2.5' />
          <div className='w-32 h-2 bg-violet-200 rounded-full ' />
        </div>
        <div className='h-2.5 bg-violet-300 rounded-full  w-12' />
      </div>
      <div className='flex justify-between items-center pt-4'>
        <div>
          <div className='h-2.5 bg-violet-300 rounded-full  w-24 mb-2.5' />
          <div className='w-32 h-2 bg-violet-200 rounded-full ' />
        </div>
        <div className='h-2.5 bg-violet-300 rounded-full  w-12' />
      </div>
      <div className='flex justify-between items-center pt-4'>
        <div>
          <div className='h-2.5 bg-violet-300 rounded-full  w-24 mb-2.5' />
          <div className='w-32 h-2 bg-violet-200 rounded-full ' />
        </div>
        <div className='h-2.5 bg-violet-300 rounded-full  w-12' />
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
