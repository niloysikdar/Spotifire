import { useSpotify } from '../hooks/useSpotify';
import { currentTrackState, isPlayingState } from '../atoms/songAtom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

import { useAudio } from '../hooks/useAudio';
import PlayTrack from './PlayTrack';

const Song = ({ index, track }) => {
  const spotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const selectTrack = (track) => {
    spotifyApi
      .play({
        uris: [track.track.uri],
      })
      .then(() => {
        setCurrentTrack(track.track.id);
        setIsPlaying(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className='grid grid-cols-2 py-1.5 px-5 pr-12 text-gray-200 rounded bg-neutral-900 hover:bg-neutral-800'>
      <div className='flex items-center'>
        <PlayTrack url={track.track.preview_url} />

        <p className='text-lg ml-4'>{index + 1}</p>
        <img
          src={track.track.album.images[2].url}
          alt={track.track.album.name}
          className='h-12 w-12 mx-5'
        />
        <div className='flex flex-col justify-center'>
          <p className='text-white font-semibold w-36 lg:w-64 truncate'>
            {track.track.name}
          </p>
          <p className='text-sm'>{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='hidden md:inline w-36 lg:w-64 truncate'>
          {track.track.album.name}
        </p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
