import ThemeProvider from '@mui/material/styles/ThemeProvider';
// Router
import { Routes, Route } from 'react-router-dom';
// Style
import theme from '../../utils/muiTheme';
import './App.scss';

// Components
import Home from '../../containers/Home/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
