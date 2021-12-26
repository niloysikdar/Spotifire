import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useSpotify } from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState, playlistDataAtom } from '../atoms/playlistAtom';

import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { PlusCircleIcon, HeartIcon } from '@heroicons/react/solid';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlistData, setplaylistData] = useRecoilState(playlistDataAtom);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setPlaylists(res.body.items);
      });
    }
  }, [spotifyApi]);

  return (
    <div className='text-[#b3b3b3] text-sm lg:text-base p-5 h-screen sm:max-w-[12rem] lg:max-w-[15rem] border-r border-gray-800 overflow-y-scroll scrollbar-hide hidden md:inline'>
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
          <p
            key={item.id}
            className='py-1 pr-1 cursor-pointer hover:text-white'
            onClick={() => setPlaylistId(item.id)}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
