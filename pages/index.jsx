import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import CenterDiv from '../components/CenterDiv';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotifire</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex bg-black h-screen overflow-hidden'>
        <Sidebar />
        <CenterDiv />
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}
