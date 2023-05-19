// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// Router
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Style
// import theme from '../../utils/muiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Components
// import Registration from '../../pages/Registration/Registration';
import Login from '../../pages/Login/Login';
import Dashboard from '../../pages/Dashboard/Dashboard';

import { RootStateType } from '../../redux/reducers/rootReducer';

function App() {
  const isHaveUser = useSelector((state: RootStateType) => state.user);

  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <Routes>
        {isHaveUser && <Route path="/" element={<Dashboard />} />}
        {/* <Route path="/" element={<Registration />} /> */}
        <Route path="/login" element={<Login />} />
        {isHaveUser && <Route path="/dashboard" element={<Dashboard />} />}
      </Routes>
    </div>
    // </ThemeProvider>
  );
}

export default App;
