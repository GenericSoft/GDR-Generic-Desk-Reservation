// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// Router
import { Navigate, Route, Routes } from 'react-router-dom';
// Style
// import theme from '../../utils/muiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Dashboard from '../../pages/Dashboard/Dashboard';
import Registration from '../../pages/Registration/Registration';
import Login from '../../pages/Login/Login';

import PrivateRoutes from '../../utils/PrivateRoutes';

// Components
function App() {
  return (
    // <ThemeProvider theme={theme}>
    // <div className="App">{routing}</div>
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
    // </ThemeProvider>
  );
}

export default App;
