import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { Paragraph, Text, Tabs, Tab } from 'grommet';
import AssetList from './AssetList';
import UserList from './UserList';

const OrganizationDetail = () => {
  let { id } = useParams();

  const [data, setData] = useState([]);
  const [assetData, setAssetData] = useState([]);
  const [userData, setUserData] = useState([]);
  const organizationsUrl = `${baseURL}/organizations/${id}`;
  const assetsUrl = `${baseURL}/organizations/${id}/assets`;
  const usersUrl = `${baseURL}/organizations/${id}/users`;

  useEffect(() => {
    async function fetchData(url, fn) {
      const result = await axios(url);
      fn(result.data);
    }

    fetchData(organizationsUrl, setData);
    fetchData(assetsUrl, setAssetData);
    fetchData(usersUrl, setUserData);
  }, []);

  return (
    <>
      <Text>Organization: {data.name}</Text>

      <Paragraph>{data.address}</Paragraph>

      <Tabs flex>
        <Tab title="Assets">
          <AssetList data={assetData} />
        </Tab>
        <Tab title="Users">
          <UserList data={userData} />
        </Tab>
      </Tabs>
    </>
  );
};

export default OrganizationDetail;
