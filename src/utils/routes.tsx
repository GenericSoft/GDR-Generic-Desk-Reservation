import { Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Dashboard from '../pages/Dashboard/Dashboard';

const routes = (isLoggedIn: boolean) => [
  {
    path: '/',
    element: !isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/dashboard" replace={true} />
    ),
    children: [
      { path: '/register', element: <Registration /> },
      { path: '/login', element: <Login /> },
      { path: '/', element: <Navigate to="/register" /> },
    ],
  },
  {
    path: '/dashboard',
    element: isLoggedIn ? <Dashboard /> : <Navigate to="/register" />,
    children: [{ path: '/dashboard', element: <Dashboard /> }],
  },
];
export default routes;
