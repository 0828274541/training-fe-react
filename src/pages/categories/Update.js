import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import { useState, useEffect } from 'react';
import AccountDetails from './Form';
import { categoriesApi } from '../../apis';
import { options } from '../Snackbar';

const CategoryUpdate = () => {
  const [category, setCategory] = useState(null);
  const [openSnackbar] = useSnackbar(options);
  const { id } = useParams();
  const navigate = useNavigate();
  const onUpdateCategory = async (title) => {
    const result = await categoriesApi.updateCategory({ _id: id, title });
    if (result.data.code === 200) {
      openSnackbar('Cập nhật thành công.!!');
      navigate('/admin/category/list');
    } else {
      openSnackbar('Cập nhật thất bại.!!');
    }
  };
  async function getCategoryById() {
    const result = await categoriesApi.getCategoryById({ id });
    if (result.data.code === 200) {
      console.log(result.data.category.title);
      setCategory({
        title: result.data.category.title,
      });
    } else {
      openSnackbar('Lỗi hoặc ID ko tồn tại.!!');
    }
  }

  useEffect(() => {
    getCategoryById();
  }, []);
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
              <AccountDetails onEventSubmit={onUpdateCategory} category={category} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CategoryUpdate;
