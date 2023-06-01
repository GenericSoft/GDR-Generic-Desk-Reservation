import Form from 'react-bootstrap/Form';

type SwitchProps = {
  label: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  handleOnClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Switch({
  label,
  className,
  id,
  disabled,
  handleOnClick,
}: SwitchProps) {
  return (
    <Form.Check
      type="switch"
      label={label}
      className={className}
      id={id}
      disabled={disabled}
      onChange={handleOnClick}
    />
  );
}

export default Switch;
