import React, { useEffect } from 'react';
import { TextInput, Box, Button, Layer, FormField, Form } from 'grommet';

const AssetEdit = props => {
  // const [data, setData] = useState([]);

  console.log(props.location.state);

  return (
    <Box>
      <Form>
        <FormField name="name" label="Name" />
        <FormField name="brand" label="Brand" />
        <FormField name="model" label="Model" />
        <FormField name="serialNumber" label="Serial Number" />
        <FormField name="type" label="Type" />
        <FormField name="acquisition" label="Acquistion" />
        <FormField name="warrantyExpiration" label="Warranty Expiration" />
        <FormField name="organizationId" label="Organization ID" />
        <FormField name="userId" label="User ID" />
        <FormField name="retired" label="Retired" />
        <FormField name="cost" label="Cost" />
        <Button type="submit" primary label="Submit" />
      </Form>
    </Box>
  );
};

export default AssetEdit;
