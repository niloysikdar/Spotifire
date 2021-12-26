import Head from 'next/head';
import { getSession } from 'next-auth/react';

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

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};
