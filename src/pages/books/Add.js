import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import AccountDetails from './Form';
import { booksApi } from '../../apis';
import { options } from '../Snackbar';

const BookAdd = () => {
  const navigate = useNavigate();
  const [openSnackbar] = useSnackbar(options);
  const onAddBook = async (title, description, author, category, cover) => {
    const formData = new FormData();
    for (let i = 0; i < cover.length; i++) {
      formData.append('cover', cover[i]);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('category', category);
    const result = await booksApi.addBook(formData);

    if (result.data.code === 200) {
      openSnackbar('Thêm sách thành công.!!');
      navigate('/admin/book/list');
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
              <AccountDetails onEventSubmit={onAddBook} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default BookAdd;
