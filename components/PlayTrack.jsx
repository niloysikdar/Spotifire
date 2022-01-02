import { useAudio } from 'react-awesome-audio';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';

const PlayTrack = ({ url }) => {
  const { isPlaying, toggle } = useAudio({ src: url });

  return (
    <button onClick={toggle}>
      {isPlaying ? (
        <PauseIcon className='h-8 w-8' />
      ) : (
        <PlayIcon className='h-8 w-8' />
      )}
    </button>
  );
};

export default PlayTrack;
