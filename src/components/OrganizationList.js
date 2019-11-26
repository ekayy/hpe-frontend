import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import axios from 'axios';
import { Route, Link, useHistory } from 'react-router-dom';

import { DataTable, Box, Meter, Text, TextInput, Heading } from 'grommet';

const OrganizationList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(`${baseURL}/organizations`);
  const [value, setValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      const result = await axios(url);
      setData(result.data);
    }
    fetchData();
  }, [url]);

  const onChange = e => {
    setValue(e.target.value);

    // console.log(Object.values(data));

    // data.map(row => {
    // })
  };

  return (
    <>
      <Box>
        <Heading>Organizations</Heading>
      </Box>

      <DataTable
        columns={[
          {
            property: 'name',
            header: 'Name',
            search: true
          },
          {
            property: 'address',
            header: 'Address',
            search: true
          }
        ]}
        data={data}
        onClickRow={({ datum }) => history.push(`/organizations/${datum.id}`)}
        sortable="true"
      />
    </>
  );
};

export default OrganizationList;
