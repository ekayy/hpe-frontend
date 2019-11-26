import React from 'react';

import { useHistory } from 'react-router-dom';
import { DataTable, Button, Box } from 'grommet';
import { Trash, Edit, AddCircle } from 'grommet-icons';
import SearchInput from './SearchInput';

const AssetList = props => {
  const history = useHistory();
  const { data, handleEdit, handleAdd, handleDelete } = props;
  const [value, setValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('name');
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
      render: datum => (
        <Button icon={<Trash />} onClick={() => handleDelete(datum.id)} />
      )
    },
    {
      property: 'edit',
      render: datum => (
        <Button
          icon={<Edit />}
          onClick={() => history.push(`/assets/${datum.id}/edit`, { datum })}
        />
      )
    }
  ];

  const options = [];

  for (let column of columns) {
    if (column['property'] !== 'delete' && column['property'] !== 'edit')
      options.push(column['property']);
  }

  return (
    <>
      <Box flex direction="row" justify="center" align="center" gap="medium">
        <SearchInput
          options={options}
          value={value}
          selectValue={selectValue}
          onChange={handleChange}
          onChangeSelect={({ option }) => setSelectValue(option)}
          type="submit"
        />

        <Button
          icon={<AddCircle />}
          label="Create New Asset"
          primary
          onClick={() => history.push(`/assets/create`, {})}
        />
      </Box>

      <DataTable
        columns={columns}
        data={searchResults.length && value ? searchResults : data}
        sortable={true}
        step={10}
      />
    </>
  );
};

export default AssetList;
