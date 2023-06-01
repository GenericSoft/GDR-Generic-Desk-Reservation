// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// Router
import { Navigate, Route, Routes } from 'react-router-dom';

// Style
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Dashboard from '../../pages/Dashboard/Dashboard';
import Registration from '../../pages/Registration/Registration';
import Login from '../../pages/Login/Login';

import PrivateRoutes from '../../utils/PrivateRoutes';
import Calendar from '../../pages/Calendar/Calendar';
import ImageMapProView from '../../pages/ImageMapProView/ImageMapProView';
import ImageMapProEditor from '../../pages/ImageMapProEditor/ImageMapProEditor';
import Profile from '../../pages/Profile/Profile';

function App() {
  return (
    <div className={`App`}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/view" element={<ImageMapProView />} />
          <Route path="/editor" element={<ImageMapProEditor />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Route>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
