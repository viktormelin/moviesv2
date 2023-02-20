import { Box, Text } from '@mantine/core';
import Icon from '@/components/Icon';
import ButtonStyled from '../Styles/Button/ButtonStyle';
import { useSetAtom } from 'jotai';
import { menuStateAtom } from '@/store/atoms';
import Image from 'next/image';
import logo from '@/assets/images/dixxel-movies-logo-transparent.png';
import type { User } from '@prisma/client';
import { useRouter } from 'next/router';

const Sidebar = ({ user }: { user: User }) => {
  const router = useRouter();
  const setCurrentMenu = useSetAtom(menuStateAtom);

  const onClick = (name: string) => {
    let destination = name;
    if (name === 'movies') {
      destination = '';
    }

    void router.push(`/${destination}`);
    setCurrentMenu(name);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: '0 2rem',
        height: '100vh',
        width: '18rem',
        backgroundColor: theme.colors.dark[8],
      })}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Image src={logo} alt="Dixxel Movies." width={100} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        <Text color="dimmed" size="sm">
          Feed
        </Text>
        <ButtonStyled name="movies" onClick={onClick}>
          <Icon icon="movie" />
          Movies
        </ButtonStyled>
        <ButtonStyled name="series" onClick={onClick}>
          <Icon icon="device-tv" />
          Series
        </ButtonStyled>
        <ButtonStyled disabled={user ? false : true} name="watchlist" onClick={onClick}>
          <Icon icon="checklist" />
          Watchlist
        </ButtonStyled>
      </Box>
    </Box>
  );
};

export default Sidebar;
