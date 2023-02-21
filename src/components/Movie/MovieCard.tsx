import type { MovieDetails } from '@/types/typings';
import { ActionIcon, Box, Text } from '@mantine/core';
import Icon from '../Icon';
import { useRouter } from 'next/router';

const MovieCard = ({ movie, type }: { movie: MovieDetails; type: string }) => {
  const router = useRouter();

  const onClick = () => {
    void router.push(`/item/${movie.id}?type=${type}`);
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '0.25rem',
        padding: '0.5rem',
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.25rem',
        }}
      >
        <ActionIcon variant="light" color="yellow">
          <Icon icon="heart-plus" />
        </ActionIcon>
        <ActionIcon variant="light" color="yellow">
          <Icon icon="playlist-add" />
        </ActionIcon>
      </Box>
      <Box>
        <Text>{movie.title}</Text>
      </Box>
    </Box>
  );
};

export default MovieCard;
