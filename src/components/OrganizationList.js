import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { DataTable, Box, Heading } from 'grommet';

const OrganizationList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const url = `${baseURL}/organizations`;

  useEffect(() => {
    // API call
    async function fetchData() {
      const result = await axios(url);
      setData(result.data);
    }
    fetchData();
  }, [url]);

  const columns = [
    {
      property: 'name',
      header: 'Name',
      search: true
    },
    {
      property: 'address',
      header: 'Address',
      search: true,
      primary: true
    }
  ];

  return (
    <>
      <Box>
        <Heading>Organizations</Heading>
      </Box>

      <DataTable
        columns={columns}
        data={data}
        onClickRow={({ datum }) => history.push(`/organizations/${datum.id}`)}
        sortable={true}
      />
    </>
  );
};

export default OrganizationList;
