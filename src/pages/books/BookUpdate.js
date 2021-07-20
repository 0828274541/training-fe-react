import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';

const BookUpdate = () => (
  <>
    <Helmet>
      <title>Books | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          Book update page
        </Box>
      </Container>
    </Box>
  </>
);

export default BookUpdate;
