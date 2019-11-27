import React from 'react';
import styled from 'styled-components';
import { baseURL } from '../config';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Button, FormField, Form, Select, Heading } from 'grommet';
import DatePicker from 'react-date-picker';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { createSecretKey } from 'crypto';

const AssetSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
  brand: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
  model: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
  serialNumber: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  type: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  userId: Yup.number()
    .positive('Must be a valid ID')
    .required('Required'),
  organizationId: Yup.number()
    .positive('Must be a valid ID')
    .required('Required'),
  acquisition: Yup.date().required('Required'),
  warrantyExpiration: Yup.date().required('Required'),
  retired: Yup.boolean().required('Required'),
  cost: Yup.number().required('Required')
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
            onChange={handleChange}
            placeholder="Eric"
          />
          {errors.name && touched.name ? (
            <StyledError>{errors.name}</StyledError>
          ) : null}
          <FormField
            name="brand"
            label="Brand"
            value={values.brand}
            onChange={handleChange}
            placeholder="Apple"
          />
          {errors.brand && touched.brand ? (
            <StyledError>{errors.brand}</StyledError>
          ) : null}
          <FormField
            name="model"
            label="Model"
            value={values.model}
            onChange={handleChange}
            placeholder="Bacon"
          />
          {errors.model && touched.model ? (
            <StyledError>{errors.model}</StyledError>
          ) : null}
          <FormField
            name="serialNumber"
            label="Serial Number"
            value={values.serialNumber}
            onChange={handleChange}
            placeholder="1234-567-89000"
          />
          {errors.serialNumber && touched.serialNumber ? (
            <StyledError>{errors.serialNumber}</StyledError>
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
          {errors.type && touched.type ? (
            <StyledError>{errors.type}</StyledError>
          ) : null}
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
            <StyledError>{errors.organizationId}</StyledError>
          ) : null}
          <FormField
            name="userId"
            label="User ID"
            value={values.userId}
            onChange={handleChange}
            placeholder="3"
          />
          {errors.userId && touched.userId ? (
            <StyledError>{errors.userId}</StyledError>
          ) : null}

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
            <StyledError>{errors.retired}</StyledError>
          ) : null}

          <FormField
            name="cost"
            label="Cost"
            value={values.cost}
            onChange={handleChange}
            placeholder="99.99"
          />
          {errors.cost && touched.cost ? (
            <StyledError>{errors.cost}</StyledError>
          ) : null}
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
          {errors.acquisition && touched.acquisition ? (
            <StyledError>{errors.acquisition}</StyledError>
          ) : null}

          <FormField>
            <StyledLabel>Warranty Expiration</StyledLabel>

            <DatePicker
              name="warrantyExpiration"
              onChange={date => setFieldValue('warrantyExpiration', date)}
              value={values.warrantyExpiration}
            />
          </FormField>
          {errors.warrantyExpiration && touched.warrantyExpiration ? (
            <StyledError>{errors.warrantyExpiration}</StyledError>
          ) : null}
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

  validationSchema: AssetSchema,

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

      try {
        return history.push(`/organizations/${res.data.organizationId}`);
      } catch (error) {
        alert(error);
      }
    } else {
      const res = await axios.post(`${baseURL}/assets`, { id, ...values });

      try {
        return history.push(`/organizations/${res.data.organizationId}`);
      } catch (error) {
        alert(error);
      }
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

const StyledError = styled.label`
  color: red;
`;
