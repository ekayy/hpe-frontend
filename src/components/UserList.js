import React from 'react';

import { DataTable, Box } from 'grommet';
import SearchInput from './SearchInput';

const columns = [
  {
    property: 'firstName',
    header: 'First Name',
    render: datum => <Box pad={{ vertical: 'xsmall' }}>{datum.firstName}</Box>
  },
  {
    property: 'lastName',
    header: 'Last Name',
    render: datum => <Box pad={{ vertical: 'xsmall' }}>{datum.lastName}</Box>
  },
  {
    property: 'email',
    header: 'Email',
    render: datum => <Box pad={{ vertical: 'xsmall' }}>{datum.email}</Box>,
    primary: true
  }
];

// Generate select options
const options = [];

for (let column of columns) {
  options.push(column['property']);
}

const UserList = props => {
  const { data } = props;
  const [value, setValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('firstName');
  const [searchResults, setSearchResults] = React.useState([...data]);

  // Handle search input
  const handleChange = e => {
    setValue(e.target.value);

    let results = data.filter(
      row => row[selectValue] && row[selectValue].toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <>
      <SearchInput
        options={options}
        value={value}
        selectValue={selectValue}
        onChange={handleChange}
        onChangeSelect={({ option }) => setSelectValue(option)}
        type="submit"
      />

      <DataTable
        columns={columns}
        data={data}
        sortable={true}
        data={searchResults.length ? searchResults : data}
      />
    </>
  );
};

export default UserList;
