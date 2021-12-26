import { useSpotify } from '../hooks/useSpotify';

const Song = ({ index, track }) => {
  const spotifyApi = useSpotify();

  return (
    <div className='flex items-center'>
      <p>{index + 1}</p>
      <img
        src={track.track.album.images[2].url}
        alt={track.track.album.name}
        className='h-10 w-10'
      />
      <div>
        <p>{track.track.name}</p>
        <p>{track.track.artists[0].name}</p>
      </div>
    </div>
  );
};

export default Song;
