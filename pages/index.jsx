import Head from 'next/head';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotifire</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-black h-screen overflow-hidden'>
        <Sidebar />
        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}
