import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const ReserveDeskButton = () => {
  const navigate = useNavigate();

  return (
    <div className="me-4">
      <Button onClick={() => navigate('/calendar')} className="btn-danger">
        Reserve a desk
      </Button>
    </div>
  );
};
export default ReserveDeskButton;
