import React, { useEffect } from 'react';
import { TextInput, Button, FormField, Form, Select } from 'grommet';
import { withFormik, Formik } from 'formik';

export const AssetEdit = props => {
  return <AssetForm {...props.location.state.datum} />;
};

export const AssetCreate = props => {
  return <AssetForm />;
};

const AssetBaseForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = props;

  return (
    <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <FormField
        name="name"
        label="Name"
        value={values.name}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
      />
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
      <FormField label="Type">
        <Select
          name="type"
          options={['compute', 'storage', 'network']}
          value={values.type}
          onChange={({ option }) => setFieldValue('type', option)}
        />
      </FormField>
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
      <FormField name="retired" label="Retired">
        <Select
          options={['true', 'false']}
          value={values.retired}
          setFieldValue={setFieldValue}
          onChange={({ option }) => setFieldValue('retired', option === true)}
        />
      </FormField>
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
  // mapPropsToValues: () => ({}),

  // validationSchema: CreateGarmentSchema,

  handleSubmit: async (values, { props, setSubmitting }) => {
    console.log(values);
  },

  displayName: 'CreateDiscussionForm'
})(AssetBaseForm);
