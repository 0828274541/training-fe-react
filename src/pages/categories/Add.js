import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import AccountDetails from './Form';
import { categoriesApi } from '../../apis/index';
import { options } from '../Snackbar';

const CategoryAdd = () => {
  const navigate = useNavigate();
  const [openSnackbar] = useSnackbar(options);
  const onAddCategory = async (title) => {
    const result = await categoriesApi.addCategory({ title });
    if (result.data.code === 200) {
      openSnackbar('Thêm danh mục thành công.!!');
      navigate('/admin/category/list');
    } else {
      openSnackbar('Thêm thất bại.!!');
    }
  };
  return (
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
              <AccountDetails onEventSubmit={onAddCategory} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CategoryAdd;
