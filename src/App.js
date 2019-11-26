import React from 'react';
import { Grommet, Box, Button, Heading } from 'grommet';
import { Notification } from 'grommet-icons';
import { Switch, Route, Link } from 'react-router-dom';
import OrganizationList from './components/OrganizationList';
import OrganizationDetail from './components/OrganizationDetail';

const App = () => {
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="3" margin="none">
            HPE
          </Heading>
          <Button icon={<Notification />} onClick={() => {}} />
        </AppBar>
        <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
          <Box
            width="small"
            background="light-2"
            elevation="small"
            align="center"
            justify="start"
          >
            <Link to="/organizations">Organizations</Link>
          </Box>

          <Box
            flex
            align="start"
            justify="start"
            fill="horizontal"
            style={{ padding: 20 }}
          >
            <Switch>
              <Route
                path="/organizations/:id"
                children={<OrganizationDetail />}
              />

              <Route path="/organizations">
                <OrganizationList />
              </Route>
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
