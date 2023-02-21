import { Box, Skeleton } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import type { MovieDetails, MovieResponse, TVDetails, TVResponse } from '@/types/typings';
import MovieCard from '../Movie';
import TVCard from '../TV';

interface Props {
  loading: boolean;
  data: MovieResponse | TVResponse | undefined;
}

const CarouselContainer = ({ loading, data }: Props) => {
  return (
    <Carousel slideSize="15rem" height="20rem" slideGap="xl" align="start" loop>
      {loading || !data ? (
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <Skeleton height="100%" width="15rem" />
          <Skeleton height="100%" width="15rem" />
          <Skeleton height="100%" width="15rem" />
        </Box>
      ) : null}
      {data &&
        data.results &&
        data.results.map((movie) => (
          <Carousel.Slide
            key={movie.id}
            sx={{
              display: 'flex',
            }}
          >
            {data.type === 'movie' ? <MovieCard movie={movie as MovieDetails} type={data.type} /> : null}
            {data.type === 'tv' ? <TVCard movie={movie as TVDetails} type={data.type} /> : null}
          </Carousel.Slide>
        ))}
    </Carousel>
  );
};

export default CarouselContainer;
