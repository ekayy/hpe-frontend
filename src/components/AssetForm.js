import React from 'react';
import { baseURL } from '../config';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Button, FormField, Form, Select } from 'grommet';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const AssetSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

export const AssetEdit = props => {
  let { id } = useParams();
  const history = useHistory();

  return (
    <AssetForm {...props.location.state.datum} id={id} history={history} />
  );
};

export const AssetCreate = props => {
  const history = useHistory();

  return <AssetForm history={history} />;
};

const AssetBaseForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    handleEdit
  } = props;

  return (
    <Form
      style={{ width: '100%' }}
      onSubmit={handleSubmit}
      handleEdit={handleEdit}
    >
      <FormField
        name="name"
        label="Name"
        value={values.name}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
      />
      {/* {errors.name && touched.name ? <div>{errors.name}</div> : null} */}
      <FormField
        name="brand"
        label="Brand"
        value={values.brand}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
      />
      <FormField
        name="model"
        label="Model"
        value={values.model}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
      />
      <FormField
        name="serialNumber"
        label="Serial Number"
        value={values.serialNumber}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
      />

      <Select
        label="Type"
        name="type"
        options={['compute', 'storage', 'network']}
        value={values.type}
        onChange={({ option }) => setFieldValue('type', option)}
      />

      <FormField
        name="acquisition"
        label="Acquistion"
        value={values.acquisition}
        setFieldValue={setFieldValue}
        onChange={handleChange}
      />
      <FormField
        name="warrantyExpiration"
        label="Warranty Expiration"
        value={values.warrantyExpiration}
        setFieldValue={setFieldValue}
        onChange={handleChange}
      />
      <FormField
        name="organizationId"
        label="Organization ID"
        value={values.organizationId}
        setFieldValue={setFieldValue}
        onChange={handleChange}
      />
      <FormField name="userId" label="User ID" value={values.userId} />

      <Select
        label="retired"
        name="retired"
        options={['true', 'false']}
        value={values.retired}
        onChange={({ option }) => setFieldValue('retired', option)}
      />

      <FormField
        name="cost"
        label="Cost"
        value={values.cost}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
      />
      <Button type="submit" primary label="Submit" />
    </Form>
  );
};

const AssetForm = withFormik({
  mapPropsToValues: props => {
    const {
      name,
      brand,
      model,
      serialNumber,
      type,
      acquisition,
      warrantyExpiration,
      organizationId,
      userId,
      retired,
      cost
    } = props;

    return {
      name,
      brand,
      model,
      serialNumber,
      type,
      acquisition,
      warrantyExpiration,
      organizationId,
      userId,
      retired: retired === 'true',
      cost
    };
  },

  validationSchema: AssetSchema,

  handleSubmit: async (values, { props, setSubmitting }) => {
    const { id, history } = props;

    if (id) {
      const res = await axios.put(`${baseURL}/assets/${id}`, { values });
      return history.push(`/organizations/${res.data.organizationId}`, {
        showMessage: true
      });
    } else {
      const res = await axios.post(`${baseURL}/assets`, { values });
      return history.push(`/organizations/${res.data.organizationId}`, {
        showMessage: true
      });
    }
  },

  displayName: 'AssetForm'
})(AssetBaseForm);
