import { useRecoilValue } from 'recoil';
import { playlistDataAtom } from '../atoms/playlistAtom';
import Song from './Song';

const AllSongs = () => {
  const playListData = useRecoilValue(playlistDataAtom);

  return (
    <div className='px-8 text-white space-y-1 pb-12'>
      {playListData?.tracks?.items?.map((item, i) => (
        <Song key={item.track.id} index={i} track={item} />
      ))}
    </div>
  );
};

export default AllSongs;
