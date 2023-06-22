import Container from 'react-bootstrap/Container';
import './UserImage.scss';

type PropsType = {
  userImage?: string;
  firstName: string | undefined;
  lastName: string | undefined;
  color?: string;
  background?: string;
};

const UserImage = (props: PropsType) => {
  let nameLogo = '';
  const isUserHasPhoto = props.userImage || props.instantPhoto;

  if (props.firstName && props.lastName) {
    nameLogo =
      props.firstName.trim().substring(0, 1).toUpperCase() +
      props.lastName.trim().substring(0, 1).toUpperCase();
  }

  return (
    <Container
      className="logo-container profile-image"
      style={{ color: props.color, background: props.background }}
    >
      {props.userImage ? (
        <img
          src={props.userImage}
          className="user-image profile-image"
          alt="user photo"
        />
      ) : (
        nameLogo
      )}
    </Container>
  );
};

export default UserImage;
