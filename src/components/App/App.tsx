// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// Router
import { Routes, Route } from 'react-router-dom';
// Style
// import theme from '../../utils/muiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Components
// import Registration from '../../pages/Registration/Registration';
import Login from '../../pages/Login/Login';
import TimeTable from '../../components/TimeTable/TimeTable';

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <Routes>
        <Route path="/" element={<TimeTable />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
    // </ThemeProvider>
  );
}

export default App;
