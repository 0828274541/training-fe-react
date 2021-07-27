import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import {
  Divider,
} from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {'Copyright © '}
      <Link color="white" href="https://material-ui.com/">
        CuongNM&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // minHeight: '33vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Divider />
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom color="white">
          Trân trọng
        </Typography>
        <Typography variant="subtitle1" align="center" color="white">
          Mọi chi tiết xin liên hệ manhcuong.vn.1805@gmail.com !!
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
}
