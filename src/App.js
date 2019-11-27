import React from 'react';
import { Grommet, Box, Button, Heading } from 'grommet';
import { Notification } from 'grommet-icons';
import { Switch, Route, Link } from 'react-router-dom';
import OrganizationList from './components/OrganizationList';
import OrganizationDetail from './components/OrganizationDetail';
import { AssetCreate, AssetEdit } from './components/AssetForm';

const App = () => {
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Link to="/">
            <Heading level="3" margin="none">
              HPE
            </Heading>
          </Link>
          <Button icon={<Notification />} onClick={() => {}} />
        </AppBar>
        <Box direction="row" flex align="start">
          <Box flex align="start" justify="start" fill="horizontal" style={{ padding: 20 }}>
            <Switch>
              <Route path="/organizations/:id/assets" component={OrganizationDetail} />
              <Route path="/organizations/:id/users" component={OrganizationDetail} />
              <Route path="/organizations/:id" component={OrganizationDetail} />
              <Route path="/organizations" component={OrganizationList} />
              <Route path="/assets/create" component={AssetCreate} />
              <Route path="/assets/:id/edit" component={AssetEdit} />
              <Route path="/" component={OrganizationList} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};

const AppBar = props => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
      style={{ zIndex: '1' }}
      {...props}
    />
  );
};

const theme = {
  global: {
    colors: {
      brand: '#228BE6'
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px'
    }
  }
};

export default App;
