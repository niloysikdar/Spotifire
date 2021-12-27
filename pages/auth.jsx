import Head from 'next/head';
import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';

import SpotifyImage from '../assets/spotify.png';

const Auth = ({ providers }) => {
  return (
    <>
      <Head>
        <title>Spotifire</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='min-h-screen flex flex-col justify-center items-center bg-[#2941ab] text-white text-center p-5'>
        <Image
          src={SpotifyImage}
          alt='Spotify Image'
          width={200}
          height={200}
        />
        <h2 className='text-[#1ed760] text-4xl font-bold mt-8'>
          Login With Spotify Right Now!
        </h2>
        <p className='mt-2 mb-10 text-xl font-medium text-[#1ed760]'>
          Control your Spotify Player and listen to your favourite music from
          anywhere :)
        </p>
        {Object.values(providers).map((provider) => {
          return (
            <button
              key={provider.id}
              className='bg-[#1ed760] text-[#2941ab] text-xl font-semibold px-7 py-2 pb-3 rounded-full'
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Login with {provider.name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Auth;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
