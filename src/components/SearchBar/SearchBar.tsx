import { ActionIcon, Box, TextInput } from '@mantine/core';
import { useState } from 'react';
import Icon from '../Icon';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const submitSearch = () => {
    console.log(searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitSearch();
    }
  };

  return (
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
  );
};

export default SearchBar;
