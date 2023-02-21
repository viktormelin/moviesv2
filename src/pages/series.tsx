import Head from 'next/head';
import { ActionIcon, Box, Text, TextInput, Skeleton } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import type { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';
import type { User } from '@prisma/client';
import Icon from '@/components/Icon';
import { useQuery } from 'react-query';
import { getMoviesInTheatre, getSeriesPlaying, getTrendingMovies, getTrendingSeries } from '@/services/queries';
import CarouselContainer from '@/components/Carousel';
import SearchBar from '@/components/SearchBar';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionToken =
    process.env.NODE_ENV === 'development'
      ? context.req.cookies['next-auth.session-token']
      : context.req.cookies['__Secure-next-auth.session-token'];

  if (!sessionToken) {
    return {
      props: {},
    };
  }

  const session = await prisma.session.findUnique({ where: { sessionToken } });

  if (session) {
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (user) {
      return {
        props: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          user: JSON.parse(JSON.stringify(user)),
        },
      };
    }

    return {
      props: {},
    };
  }

  return {
    props: {},
  };
};

const Home = ({ user }: { user: User }) => {
  const desktop = useMediaQuery('(min-width:900px)');

  const [searchQuery, setSearchQuery] = useState<string>('');

  const trendingSeries = useQuery('trendingSeries', getTrendingSeries);
  const seriesPlayingNow = useQuery('seriesPlayingNow', getSeriesPlaying);

  const submitSearch = () => {
    console.log(searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitSearch();
    }
  };

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
          }}
        >
          <SearchBar />
          <Box>
            <Text
              component="h2"
              sx={{
                marginBottom: '1rem',
                fontSize: '1.3rem',
              }}
            >
              Trending today
            </Text>
            <CarouselContainer loading={trendingSeries.isLoading} data={trendingSeries.data?.data} />
          </Box>
          <Box>
            <Text
              component="h2"
              sx={{
                marginBottom: '1rem',
                fontSize: '1.3rem',
              }}
            >
              TV shows playing now
            </Text>
            <CarouselContainer loading={seriesPlayingNow.isLoading} data={seriesPlayingNow.data?.data} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
