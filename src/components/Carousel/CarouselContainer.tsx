import { Box, Text, Skeleton } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import type { Movie } from '@/types/typings';

interface Props {
  loading: boolean;
  data: Movie[] | undefined;
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
        data.map((movie) => (
          <Carousel.Slide
            key={movie.id}
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                borderRadius: '0.25rem',
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <Text>{movie.title}</Text>
            </Box>
          </Carousel.Slide>
        ))}
    </Carousel>
  );
};

export default CarouselContainer;
