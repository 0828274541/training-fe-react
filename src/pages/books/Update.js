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
import { booksApi } from '../../apis';
import { options } from '../Snackbar';

const UserUpdate = () => {
  const [book, setBook] = useState(null);
  const [openSnackbar] = useSnackbar(options);
  const { id } = useParams();
  const navigate = useNavigate();
  const onUpdateBook = async (title, description, author, category, cover) => {
    const formData = new FormData();
    for (let i = 0; i < cover.length; i++) {
      formData.append('cover', cover[i]);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('category', category);
    const result = await booksApi.updateBook(id, formData);

    if (result.data.code === 200) {
      openSnackbar('Cập nhật thành công.!!');
      navigate('/admin/book/list');
    } else {
      openSnackbar('Cập nhật thất bại.!!');
    }
  };
  const getBookUpdate = async () => {
    const result = await booksApi.findByBookId({ bookId: id });
    if (result.data.code === 200) {
      setBook({
        title: result.data.book[0].title,
        description: result.data.book[0].description,
        author: result.data.book[0].author,
        cover: '',
        category: {
          _id: result.data.book[0].category ? result.data.book[0].category._id : '0',
          title: result.data.book[0].category ? result.data.book[0].category.title : '--Chon danh muc--'
        }
      });
    } else {
      openSnackbar('Lỗi hoặc ID ko tồn tại.!!');
    }
  };

  useEffect(() => {
    getBookUpdate();
  }, []);
  return (
    <>
      {book
      && (
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
                <AccountDetails onEventSubmit={onUpdateBook} book={book} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
      )}
    </>
  );
};

export default UserUpdate;
