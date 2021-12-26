import { useEffect } from 'react';

import { useAudio } from '../hooks/useAudio';
import { PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/solid';

const PlayTrack = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <button onClick={toggle}>
      {playing ? (
        <PauseIcon className='h-8 w-8' />
      ) : (
        <PlayIcon className='h-8 w-8' />
      )}
    </button>
  );
};

export default PlayTrack;
