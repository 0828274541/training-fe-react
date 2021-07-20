import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';

const CategoryAdd = () => (
  <>
    <Helmet>
      <title>Categories | Material Kit</title>
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
          Category add page
        </Box>
      </Container>
    </Box>
  </>
);

export default CategoryAdd;
