import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountDetails from './AccountDetails';

async function onAddUser(user) {
  console.log(user);
}
const users = {
  username: 'admin',
  password: 'password'
};
const UserAdd = () => (
  <>
    <Helmet>
      <title>Account | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          justifyContent="center"
          marginTop="20px"
        >
          <Grid
            item
            lg={8}
            md={8}
            xs={8}
          >
            <AccountDetails onAddUser={onAddUser} user={users} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default UserAdd;
