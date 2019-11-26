import React from 'react';
import { TextInput, Box, Select } from 'grommet';

const SearchInput = props => {
  const { options, value, selectValue, onChange, onChangeSelect } = props;

  return (
    <Box direction="row" justify="center" pad={{ vertical: '20px' }}>
      <TextInput
        placeholder="Search"
        value={value}
        onChange={onChange}
        type="search"
      />
      <Select
        options={options}
        value={selectValue}
        onChange={onChangeSelect}
        placeholder="Search by Column"
      />
    </Box>
  );
};

export default SearchInput;
