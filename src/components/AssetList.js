import React from 'react';
import { Trash, Edit } from 'grommet-icons';
import { debounce } from 'lodash';

import { Link, useParams } from 'react-router-dom';
import { DataTable, Box, Text, Button, TextInput, Select } from 'grommet';
import SearchInput from './SearchInput';

const columns = [
  {
    property: 'name',
    header: 'Name'
  },
  {
    property: 'brand',
    header: 'Brand'
  },
  {
    property: 'model',
    header: 'Model'
  },
  {
    property: 'serialNumber',
    header: 'Serial Number',
    primary: true
  },
  {
    property: 'type',
    header: 'Type'
  },
  {
    property: 'acquisition',
    header: 'Acquisition'
  },
  {
    property: 'warrantyExpiration',
    header: 'Warranty Expiration'
  },
  {
    property: 'userId',
    header: 'User ID'
  },
  {
    property: 'retired',
    header: 'Retired?',
    render: datum => (datum.retired ? 'Yes' : 'No')
  },
  {
    property: 'cost',
    header: 'Cost'
  },
  {
    property: 'delete',
    render: datum => <Button icon={<Trash />} />
  },
  {
    property: 'edit',
    render: datum => <Button icon={<Edit />} />
  }
];

const options = [];

for (let column of columns) {
  if (column['property'] !== 'delete' && column['property'] !== 'edit')
    options.push(column['property']);
}

const AssetList = React.memo(props => {
  const { data } = props;
  const [value, setValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('');
  const [searchResults, setSearchResults] = React.useState(data);

  const handleChange = e => {
    setValue(e.target.value);

    let results = data.filter(
      row =>
        row[selectValue] &&
        row[selectValue].toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleAdd = () => {};

  return (
    <>
      <Text onClick={handleAdd}>Add</Text>

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
        data={searchResults.length && value ? searchResults : data}
        sortable={true}
        step={10}
      />
    </>
  );
});

export default AssetList;
