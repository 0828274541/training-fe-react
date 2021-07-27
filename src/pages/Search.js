import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Divider
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'react-simple-snackbar';
import Pagination from '@material-ui/lab/Pagination';
import { booksApi } from '../apis';
import HomeFooter from './HomeFooter';
import { options } from './Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
      display: 'flex',
      justifyContent: 'center',
    },
  },
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();
  const [openSnackbar] = useSnackbar(options);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loadPage, setLoadPage] = useState(false);
  const { keyWord } = useParams();
  async function getBook() {
    const result = await booksApi.getBook({
      page,
      limit: 6,
      keyword: keyWord,
    });
    if (result.data.code === 200) {
      const {
        docs: bookList, page: pageReturn, totalPages
      } = result.data.books;
      if (bookList.length) {
        setPage(pageReturn);
        setTotalPage(totalPages);
        setBooks(bookList);
      } else {
        setBooks([]);
        openSnackbar('Ko có kết quả nào đc tìm thấy.!!');
      }
    }
  }
  const handleChange = (event, value) => {
    setPage(value);
    setLoadPage(!loadPage);
  };
  useEffect(() => {
    getBook();
  }, [loadPage, keyWord]);
  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" align="center" color="textPrimary" gutterBottom>
              Tim kiem sản phẩm
            </Typography>
            <Typography align="center" color="textSecondary" paragraph>
              Dưới đây là danh sach sau khi tim kiem.
            </Typography>
          </Container>
        </div>
        <Divider />
        <div className={classes.heroContent}>
          <Container className={classes.cardGrid} maxWidth="md" style={{ minHeight: '280px' }}>
            {/* End hero unit */}
            <Grid container spacing={4}>
              {!!books.length && books.map((book, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <RouterLink to={`/detail/${book._id}`}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`http://localhost:3001/${book.cover.length ? book.cover[0] : 'public/covers/noimg.jpg'}`}
                        title="Image title"
                      />
                    </RouterLink>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Tiêu đề:&nbsp;&nbsp;
                        {book.title}
                      </Typography>
                      <Typography>
                        Mô tả:&nbsp;&nbsp;
                        {book.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <RouterLink to={`/detail/${book._id}`}>
                        <Button size="small" style={{ backgroundColor: 'yellow' }}>
                          Chi tiết
                        </Button>
                      </RouterLink>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              {!!books.length || (
              <Container maxWidth="sm">
                <Typography component="h1" align="center" color="textPrimary" gutterBottom>
                  DATA NOT FOUND
                </Typography>
              </Container>
              )}
            </Grid>
            {!!books.length && (
            <div className={classes.root}>
              <Pagination count={totalPage} page={page} onChange={handleChange} variant="text" />
            </div>
            )}
          </Container>
        </div>
      </main>
      {/* Footer */}
      <HomeFooter />
      {/* End footer */}
    </>
  );
}
