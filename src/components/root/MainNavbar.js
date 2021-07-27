import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { makeStyles, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';
import Logo from './Logo';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 36,
  marginTop: 9,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows },
  '& fieldset': {
    borderWidth: '1px !important',
    borderColor: `${theme.palette.grey} !important`
  },
  backgroundColor: 'pink',
  input: {
    '&::placeholder': {
      fontStyle: 'italic',
      color: 'white'
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    padding: '20px'
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const MainNavbar = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;
  function handleSearch(event) {
    if (event.key === 'Enter') {
      navigate(`/search/${event.target.value}`);
    }
  }

  useEffect(() => {
    if (!location.pathname.includes('search')) {
      document.getElementById('search').value = '';
    } else {
      // f5 ko bi mat keyword
      const string = location.pathname.lastIndexOf('/');
      document.getElementById('search').value = location.pathname.slice(string + 1);
    }
  }, [location]);
  return (
    <AppBar
      elevation={0}
      {...props}
    >
      <Toolbar sx={{ height: 64, backgroundColor: '#f3f2f7' }}>
        <RouterLink to="/home">
          <Box display="flex">
            <Logo />
            <Typography
              align="center"
              variant="h2"
              lineHeight="2.2"
              marginLeft="10px"
              className={classes.toolbarTitle}
              noWrap
            >
              Trang chủ
            </Typography>
          </Box>
        </RouterLink>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <SearchStyle
            placeholder="Tìm kiếm..."
            color="secondary"
            onKeyPress={handleSearch}
            id="search"
            style={{ display: !isLoggedIn ? 'none' : '' }}
            startAdornment={(
              <InputAdornment position="start">
                <Box
                  component={Icon}
                  icon={searchFill}
                  sx={{ color: 'white' }}
                />
              </InputAdornment>
          )}
          />
          {isLoggedIn && (
          <RouterLink to="/admin">
            <Button color="secondary" style={{ margin: '10px', backgroundColor: 'white' }}>
              Admin
            </Button>
          </RouterLink>
          )}
          {!isLoggedIn && (
            <RouterLink to="/register">
              <Button color="secondary" variant="outlined" style={{ margin: '10px', backgroundColor: 'white' }}>
                Đăng ký
              </Button>
            </RouterLink>
          )}
          <RouterLink to={isLoggedIn ? '/logout' : '/login'}>
            <Button color="secondary" variant="outlined" style={{ margin: '10px', backgroundColor: 'white' }}>
              {isLoggedIn ? 'Đăng xuất' : 'Đăng ký'}
            </Button>
          </RouterLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
