import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { baseURL } from '../config';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

import { Box, Paragraph, Button, Heading } from 'grommet';
import AssetList from './AssetList';
import UserList from './UserList';
import { User, Organization } from 'grommet-icons';

const OrganizationDetail = props => {
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

  /* TODO lift state: pass add and edit through to form */
  const handleAdd = async () => {
    const res = await axios.post(`${baseURL}/assets`);

    setAssetData([...assetData, res.data]);
  };

  const handleEdit = async id => {
    const res = await axios.put(`${baseURL}/assets/${id}`);
    setAssetData(assetData.filter(item => item.id !== id));
  };

  const handleDelete = async id => {
    await axios.delete(`${baseURL}/assets/${id}`);
    setAssetData(assetData.filter(item => item.id !== id));
  };

  // check url is user?
  const isUserUrl = /users$/.test(props.match.url);

  return (
    <>
      <Heading size="small" margin="none">
        {data.name}
      </Heading>

      <Paragraph>{data.address}</Paragraph>

      <Box flex direction="row" gap="small">
        <NavLink to={`/organizations/${id}/assets`}>
          <Button icon={<Organization />} label="View Assets" active={!isUserUrl} />
        </NavLink>
        <NavLink to={`/organizations/${id}/users`}>
          <Button icon={<User />} label="View Users" active={isUserUrl} />
        </NavLink>
      </Box>

      {isUserUrl ? (
        <UserList data={userData} />
      ) : (
        <AssetList
          data={assetData}
          handleEdit={handleEdit}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

const Tab = styled.div`
  padding: 20px;
`;
export default OrganizationDetail;
