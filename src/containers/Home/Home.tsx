import Alert from 'react-bootstrap/Alert';
import Navigation from '../../components/Navigation/Navigation';

function Home() {
  return (
    <>
      <Navigation />
      <Alert className="alert-primary">
        This is a primary alert—check it out!
      </Alert>
    </>
  );
}

export default Home;
