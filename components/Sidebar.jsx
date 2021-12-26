import { useState, useEffect } from 'react';
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { PlusCircleIcon, HeartIcon } from '@heroicons/react/solid';

import { signOut, useSession } from 'next-auth/react';
import { useSpotify } from '../hooks/useSpotify';

const values = [...Array(15).keys()];

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setPlaylists(res.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className='text-[#b3b3b3] p-5 h-screen w-52 border-r-[0.1px] overflow-y-scroll scrollbar-hide  '>
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
        {playlists?.map((item) => (
          <p key={item.id} className='py-1 cursor-pointer hover:text-white'>
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
