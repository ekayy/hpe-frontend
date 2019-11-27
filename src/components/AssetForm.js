import React from 'react';
import styled from 'styled-components';
import { baseURL } from '../config';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Button, FormField, Form, Select, Heading } from 'grommet';
import DatePicker from 'react-date-picker';
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
    <>
      <Heading>Edit Asset</Heading>
      <AssetForm {...props.location.state.datum} id={id} history={history} />
    </>
  );
};

export const AssetCreate = props => {
  const history = useHistory();

  return (
    <>
      <Heading>Create New Asset</Heading>
      <AssetForm history={history} />
    </>
  );
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
    <Form onSubmit={handleSubmit}>
      <StyledForm>
        <StyledColumn>
          <FormField
            name="name"
            label="Name"
            value={values.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Eric"
          />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          <FormField
            name="brand"
            label="Brand"
            value={values.brand}
            handleChange={handleChange}
            placeholder="Apple"
          />
          {errors.brand && touched.brand ? <div>{errors.brand}</div> : null}
          <FormField
            name="model"
            label="Model"
            value={values.model}
            handleChange={handleChange}
            placeholder="Bacon"
          />
          {errors.model && touched.model ? <div>{errors.model}</div> : null}
          <FormField
            name="serialNumber"
            label="Serial Number"
            value={values.serialNumber}
            handleChange={handleChange}
            placeholder="1234-567-89000"
          />
          {errors.serialName && touched.serialName ? (
            <div>{errors.serialName}</div>
          ) : null}

          <FormField>
            <StyledLabel>Type</StyledLabel>
            <Select
              label="Type"
              name="type"
              options={['compute', 'storage', 'network']}
              value={values.type}
              onChange={({ option }) => setFieldValue('type', option)}
            />
          </FormField>
          {errors.type && touched.type ? <div>{errors.type}</div> : null}
        </StyledColumn>

        <StyledColumn>
          <FormField
            name="organizationId"
            label="Organization ID"
            value={values.organizationId}
            onChange={handleChange}
            placeholder="5"
          />
          {errors.organizationId && touched.organizationId ? (
            <div>{errors.organizationId}</div>
          ) : null}
          <FormField
            name="userId"
            label="User ID"
            value={values.userId}
            onChange={handleChange}
            placeholder="3"
          />
          {errors.userId && touched.userId ? <div>{errors.userId}</div> : null}

          <FormField>
            <StyledLabel>Retired</StyledLabel>
            <Select
              label="retired"
              name="retired"
              options={['true', 'false']}
              value={values.retired}
              onChange={({ option }) => setFieldValue('retired', option)}
            />
          </FormField>
          {errors.retired && touched.retired ? (
            <div>{errors.retired}</div>
          ) : null}

          <FormField
            name="cost"
            label="Cost"
            value={values.cost}
            handleChange={handleChange}
            placeholder="99.99"
          />
          {errors.cost && touched.cost ? <div>{errors.cost}</div> : null}
        </StyledColumn>

        <StyledColumn>
          <FormField>
            <StyledLabel>Acquisition</StyledLabel>
            <DatePicker
              name="acquisition"
              onChange={date => setFieldValue('acquisition', date)}
              value={values.acquisition}
            />
          </FormField>

          <FormField>
            <StyledLabel>Warranty Expiration</StyledLabel>

            <DatePicker
              name="warrantyExpiration"
              onChange={date => setFieldValue('warrantyExpiration', date)}
              value={values.warrantyExpiration}
            />
          </FormField>
        </StyledColumn>
      </StyledForm>
      <Button
        type="submit"
        primary
        label="Submit"
        style={{ alignSelf: 'flex-end' }}
      />
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
      acquisition: acquisition ? new Date(acquisition) : new Date(),
      warrantyExpiration: warrantyExpiration
        ? new Date(warrantyExpiration)
        : new Date(),
      organizationId,
      userId,
      retired,
      cost
    };
  },

  // validationSchema: AssetSchema,

  handleSubmit: async (values, { props, setSubmitting }) => {
    const { id, history } = props;

    const { acquisition, warrantyExpiration } = values;

    values['acquisition'] = acquisition.toISOString();
    values['warrantyExpiration'] = warrantyExpiration.toISOString();

    if (id) {
      const res = await axios.put(`${baseURL}/assets/${id}`, {
        id,
        ...values
      });

      return history.push(`/organizations/${res.data.organizationId}`);
    } else {
      const res = await axios.post(`${baseURL}/assets`, { id, ...values });
      return history.push(`/organizations/${res.data.organizationId}`);
    }
  },

  displayName: 'AssetForm'
})(AssetBaseForm);

const StyledForm = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledColumn = styled.div`
  padding: 10px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 6px;
  margin-bottom: 6px;
  font-size: 18px;
  line-height: 24px;
`;
