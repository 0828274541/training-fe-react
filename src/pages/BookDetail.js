import { useParams } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Card,
  CardContent,
  Grid
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { options } from './Snackbar';
import { booksApi } from '../apis';
import HomeFooter from './HomeFooter';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();
  const [book, setBook] = useState({});
  const [openSnackbar] = useSnackbar(options);
  const { detailId } = useParams();

  const getBookUpdate = async () => {
    const result = await booksApi.findByBookId({ bookId: detailId });
    if (result.data.code === 200) {
      setBook(result.data.book[0]);
    } else {
      openSnackbar('Lỗi hoặc ID ko tồn tại.!!');
    }
  };

  useEffect(() => {
    getBookUpdate();
  }, []);
  console.log(book);
  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" align="center" color="textPrimary" gutterBottom>
              Chi tiết sản phẩm
            </Typography>
            <Typography align="center" color="textSecondary" paragraph>
              Dưới đây là chi tiết của sản phẩm gồm ảnh, danh muc, tiêu đề, người đăng, tác giả.
            </Typography>
          </Container>
        </div>
        <Divider />
      </main>
      <Container maxWidth="md" style={{ minHeight: '369px' }}>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={4}
                xs={12}
                height="100%"
              >
                <img
                  src={`http://localhost:3001/${book.cover && book.cover.length ? book.cover[0] : 'public/covers/noimg.jpg'}`}
                  alt={book.title}
                  width="200px"
                  height="200px"
                  borderRadius="2px"
                  border="1px solid #ddd"
                />
              </Grid>
              <Grid
                item
                md={8}
                xs={12}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Tiêu đề:&nbsp;&nbsp;
                    {book.title}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Mô tả:&nbsp;&nbsp;
                    {book.description}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Tác giả:&nbsp;&nbsp;
                    {book.author}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Người đăng:&nbsp;&nbsp;
                    {book.owner ? book.owner.username : 'Tài khoản ko tồn tại'}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Danh mục:&nbsp;&nbsp;
                    {book.category ? book.owner.title : 'Danh mục ko tồn tại'}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      {/* Footer */}
      <HomeFooter />
      {/* End footer */}
    </>
  );
}
