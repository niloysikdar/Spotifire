import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { PlusCircleIcon, HeartIcon } from '@heroicons/react/solid';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const values = [...Array(10).keys()];

const Sidebar = () => {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div className='text-[#b3b3b3] p-5 h-screen w-52 border-r-2'>
      <div className='space-y-5'>
        <button
          className='flex items-center space-x-3 hover:text-white'
          onClick={() => signOut()}
        >
          <LogoutIcon className='h-5 w-5' /> <p>Logout</p>
        </button>

        <button className='flex items-center space-x-3 hover:text-white'>
          <HomeIcon className='h-5 w-5' /> <p>Home</p>
        </button>

        <button className='flex items-center space-x-3 hover:text-white'>
          <SearchIcon className='h-5 w-5' /> <p>Search</p>
        </button>

        <button className='flex items-center space-x-3 hover:text-white'>
          <LibraryIcon className='h-5 w-5' /> <p>Your Library</p>
        </button>
      </div>

      <div className='space-y-5 mt-10 mb-5'>
        <button className='flex items-center space-x-3 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' /> <p>Create Playlist</p>
        </button>

        <button className='flex items-center space-x-3 hover:text-white'>
          <HeartIcon className='h-5 w-5' /> <p>Liked Songs</p>
        </button>
      </div>

      <hr className='border-t-[0.5px] border-gray-900' />

      {/* Playlist */}
      <div className='py-3 space-y-2'>
        {values.map((value) => (
          <p key={value} className='py-1 cursor-pointer hover:text-white'>
            New Playlist
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
