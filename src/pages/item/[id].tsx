import Sidebar from '@/components/Sidebar';
import { Box, Button, Text } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import prisma from '@/lib/prisma';
import type { User } from '@prisma/client';
import SearchBar from '@/components/SearchBar';
import axios from 'axios';
import type { MovieDetails, MovieResponse, TVDetails, TVResponse } from '@/types/typings';
import Icon from '@/components/Icon';
import { Fragment } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props:
    | {
        [key: string]: any;
      }
    | Promise<{
        [key: string]: any;
      }> = {};

  if (context.query && context.query.type && context.query.id) {
    const type = context.query.type as string;
    const id = context.query.id as string;

    const response = await axios.get<MovieResponse | TVResponse>(`https://api.themoviedb.org/3/${type}/${id}`, {
      params: { api_key: process.env.TMDB_API_KEY_V3, append_to_response: 'videos' },
    });

    console.log(response.data);

    if (response.status === 200) {
      if (type === 'movie') {
        props.movie = JSON.parse(JSON.stringify(response.data)) as MovieDetails;
      } else if (type === 'tv') {
        props.tv = JSON.parse(JSON.stringify(response.data)) as TVDetails;
      }
    }
  }

  const sessionToken =
    process.env.NODE_ENV === 'development'
      ? context.req.cookies['next-auth.session-token']
      : context.req.cookies['__Secure-next-auth.session-token'];

  if (!sessionToken) {
    return {
      props,
    };
  }

  const session = await prisma.session.findUnique({ where: { sessionToken } });

  if (session) {
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (user) {
      props.user = JSON.parse(JSON.stringify(user)) as User;
    }

    return {
      props,
    };
  }

  return {
    props,
  };
};

const ItemPage = ({ user, movie, tv }: { user: User; movie?: MovieDetails; tv?: TVDetails }) => {
  const router = useRouter();
  const { id, type } = router.query;

  return (
    <>
      <Head>
        <title>Dixxel Movies</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        {/* <link rel='icon' href='/favicon.ico' /> */}
        <link rel="icon" type="image/png" href="/cf-wrapper-logo-transparent.png" />

        <meta property="og:url" content="https://movies.dixxel.io/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dixxel Movies" />
        <meta property="og:description" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="movies.dixxel.io" />
        <meta property="twitter:url" content="https://movies.dixxel.io/" />
        <meta name="twitter:title" content="Dixxel Movies" />
        <meta name="twitter:description" content="" />
      </Head>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          backgroundImage: 'linear-gradient(to bottom, rgb(38, 38, 38, 0.9) 10%, rgb(13, 13, 13))',
        }}
      >
        <Sidebar user={user} />
        {movie ? (
          <Box
            component="main"
            sx={{
              flex: 1,
              height: '100%',
              width: 'calc(100% - 18rem)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5rem',
              overflowY: 'auto',
              backgroundImage: `linear-gradient(0deg, rgba(0, 17, 32, 0.8), rgba(0, 17, 32, 0.8)), 
              url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <SearchBar />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                height: '100%',
              }}
            >
              <Box>
                <Text component="h1" fz="2rem">
                  {movie.title}
                </Text>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                  }}
                >
                  <Text
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <Icon icon="star" />
                    {movie.vote_average}{' '}
                    <Text color="dimmed" fz="0.8rem">
                      / {movie.vote_count}
                    </Text>
                  </Text>
                  <Text>{movie.release_date}</Text>
                  <Text
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    {movie.runtime}{' '}
                    <Text color="dimmed" fz="0.8rem">
                      MIN
                    </Text>
                  </Text>
                  <Text
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    {movie.genres.map((genre, key) => (
                      <Fragment key={key}>
                        <Text>{genre.name}</Text>
                        {key + 1 < movie.genres.length ? (
                          <Text color="dimmed" fz="0.8rem">
                            |
                          </Text>
                        ) : null}
                      </Fragment>
                    ))}
                  </Text>
                </Box>
              </Box>
              {movie.videos &&
                movie.videos.results &&
                movie.videos.results.map((video, key) => {
                  if (video.type === 'Trailer' && video.official) {
                    return (
                      <Box key={key}>
                        <Button component="a" href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank">
                          {video.name}
                        </Button>
                      </Box>
                    );
                  }
                })}
            </Box>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default ItemPage;
