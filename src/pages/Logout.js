import { Navigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import { useDispatch } from 'react-redux';
import { options } from './Snackbar';

const Logout = () => {
  const dispatch = useDispatch();
  const [openSnackbar] = useSnackbar(options);
  const handleLogout = async () => {
    const data = {
      username: null,
      token: null,
      role: null
    };
    dispatch({ type: 'SET_LOGIN', payload: data });
    openSnackbar('Đăng xuất thành công.!!');
  };
  handleLogout();
  return (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default Logout;
