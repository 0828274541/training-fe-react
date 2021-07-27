import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HomeCategory from './HomeCategory';
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
}));

export default function Album() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" align="center" color="textPrimary" gutterBottom>
              Danh sach sản phẩm
            </Typography>
            <Typography align="center" color="textSecondary" paragraph>
              Sản phẩm ko dành cho người dưới 18+.
              Vui lòng rời khỏi nếu chưa đủ tuổi
            </Typography>
          </Container>
        </div>
        <HomeCategory />
      </main>
      {/* Footer */}
      <HomeFooter />
      {/* End footer */}
    </>
  );
}
