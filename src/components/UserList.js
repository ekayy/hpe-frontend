import React from 'react';

import { DataTable, Box, Select, TextInput } from 'grommet';

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

const UserList = props => {
  const { data } = props;
  const [value, setValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('firstName');
  const [searchResults, setSearchResults] = React.useState([...data]);

  const onChange = e => {
    setValue(e.target.value);

    let results = data.filter(
      row =>
        row[selectValue] &&
        row[selectValue].toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <>
      <Box direction="row" justify="center" pad={{ vertical: '20px' }}>
        <TextInput
          placeholder="Search"
          value={value}
          onChange={onChange}
          type="search"
        />
        <Select
          options={Object.keys(data[0]).filter(key => key !== 'id')}
          value={selectValue}
          onChange={({ option }) => setSelectValue(option)}
          placeholder="Search by Column"
        />
      </Box>

      <DataTable
        columns={columns}
        data={data}
        sortable={true}
        search={true}
        data={searchResults.length ? searchResults : data}
      />
    </>
  );
};

export default UserList;
