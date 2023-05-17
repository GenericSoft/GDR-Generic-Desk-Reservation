import Alert from 'react-bootstrap/Alert';
import NavigationBar from '../../components/Navigation/NavigationBar';

function Home() {
  return (
    <>
      <NavigationBar />
      <Alert className="alert-primary">
        This is a primary alert—check it out!
      </Alert>
    </>
  );
}

export default Home;
