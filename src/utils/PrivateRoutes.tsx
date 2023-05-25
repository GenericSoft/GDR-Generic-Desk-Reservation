import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const PrivateRoutes = () => {
  const userData = useAppSelector((state) => state.user);
  const isLoggedUser = userData.userId ? true : false;
  return isLoggedUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
