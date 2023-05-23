// import ThemeProvider from '@mui/material/styles/ThemeProvider';
// Router
import { useRoutes } from 'react-router-dom';
// Style
// import theme from '../../utils/muiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { useAppSelector } from '../../redux/store';
import routes from '../../utils/routes';
// Components

function App() {
  const user = useAppSelector((state) => state.user);
  const loggedUser = user.firstName || '';

  const routing = useRoutes(routes(loggedUser));

  return (
    // <ThemeProvider theme={theme}>
    <div className="App">{routing}</div>
    // </ThemeProvider>
  );
}

export default App;
