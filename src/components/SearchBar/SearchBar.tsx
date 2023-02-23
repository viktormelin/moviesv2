import { ActionIcon, Box, Modal, TextInput, Text, Image, Center } from '@mantine/core';
import { useState } from 'react';
import Icon from '../Icon';
import axios from 'axios';
import { useRouter } from 'next/router';

interface LocalMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  number_of_episodes: number;
  media_type: string;
}
interface LocalResponse {
  results: LocalMedia[];
}

const SearchBar = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<LocalResponse | undefined>(undefined);

  const submitSearch = async () => {
    const response = await axios.get<LocalResponse>('api/misc/search', {
      params: { query: searchQuery },
    });

    setSearchResult(response.data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      void submitSearch();
    }
  };

  const onClick = (item: LocalMedia) => {
    void router.push(`/item/${item.id}?type=${item.media_type}`);
  };

  return (
    <>
      <Box
        sx={{
          width: '30%',
        }}
      >
        <TextInput
          onSubmit={submitSearch}
          icon={<Icon icon="search" />}
          size="lg"
          variant="filled"
          radius="xl"
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          rightSection={
            <ActionIcon onClick={submitSearch} variant="filled" color="blue" radius="xl">
              <Icon icon="arrow-right" />
            </ActionIcon>
          }
          placeholder="Search everything..."
          rightSectionWidth={50}
        />
      </Box>
      <Modal opened={searchResult?.results !== undefined} onClose={() => setSearchResult(undefined)}>
        {searchResult?.results.map((item) => (
          <Box
            onClick={() => onClick(item)}
            key={item.id}
            sx={(theme) => ({
              'cursor': 'pointer',
              'height': '6rem',
              'width': '100%',
              'padding': '0.5rem',
              'display': 'flex',
              'gap': '1rem',
              'borderRadius': '0.25rem',
              '&:hover': {
                backgroundColor: theme.colors.dark[6],
              },
            })}
          >
            <Box
              sx={{
                height: '100%',
                width: '4rem',
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '0.25rem',
              }}
            />
            <Box
              sx={{
                // height: '100%',
                // width: '100%',
                // padding: '0.5rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                // gap: '1rem',
              }}
            >
              <Text>{item.name ?? item.title}</Text>
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
                  {item.vote_average}{' '}
                  <Text color="dimmed" fz="0.8rem">
                    / {item.vote_count}
                  </Text>
                </Text>
                <Text>{item.release_date}</Text>
                <Text
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  {item.runtime ? (
                    <>
                      {item.runtime}{' '}
                      <Text color="dimmed" fz="0.8rem">
                        MIN
                      </Text>
                    </>
                  ) : null}
                  {item.number_of_episodes ? (
                    <>
                      {item.number_of_episodes}{' '}
                      <Text color="dimmed" fz="0.8rem">
                        EP.
                      </Text>
                    </>
                  ) : null}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Modal>
    </>
  );
};

export default SearchBar;
