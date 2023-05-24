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
  const userData = useAppSelector((state) => state.user);
  const isLoggedUser = userData.userId ? true : false;

  const routing = useRoutes(routes(isLoggedUser));

  return (
    // <ThemeProvider theme={theme}>
    <div className="App">{routing}</div>
    // </ThemeProvider>
  );
}

export default App;
