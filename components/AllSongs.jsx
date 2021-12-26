import { useRecoilValue } from 'recoil';
import { playlistDataAtom } from '../atoms/playlistAtom';
import SongsHeader from './SongsHeader';
import Song from './Song';

const AllSongs = () => {
  const playListData = useRecoilValue(playlistDataAtom);

  return (
    <div className='px-8 text-white space-y-1.5 mt-8 pb-12'>
      <SongsHeader />

      <div className='pt-3 space-y-1.5'>
        {playListData?.tracks?.items?.map((item, i) => (
          <Song key={item.track.id} index={i} track={item} />
        ))}
      </div>
    </div>
  );
};

export default AllSongs;
