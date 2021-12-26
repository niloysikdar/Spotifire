import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import spotifyApi from '../utils/spotify';

export const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh token fails, then redirect user to signin
      if (session.error === 'RefreshTokenError') {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
};
