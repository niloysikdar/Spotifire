import { ClockIcon } from '@heroicons/react/outline';

const SongsHeader = () => {
  return (
    <div className='grid grid-cols-2 py-1.5 px-5 pr-12 text-gray-300 border-b border-gray-800'>
      <div className='flex items-center ml-12'>
        <p className='text-lg font-bold'>#</p>

        <div className='flex flex-col justify-center'>
          <p className='ml-5 font-semibold'>TITLE</p>
        </div>
      </div>

      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='hidden md:inline'>ALBUM</p>
        <ClockIcon className='h-5 w-5' />
      </div>
    </div>
  );
};

export default SongsHeader;
