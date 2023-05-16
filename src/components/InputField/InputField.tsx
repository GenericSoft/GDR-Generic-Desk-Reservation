import React from 'react';

import Form from 'react-bootstrap/Form';

type InputFieldProps = {
  reference: React.RefObject<HTMLInputElement>;
  placeholder: string;
  label: string;
  type?: string;
};

const InputField = ({
  reference,
  placeholder,
  label,
  type,
}: InputFieldProps) => {
  return (
    <Form.Group className="mb-3 one-line inp" controlId="formBasicEmail">
      <Form.Control ref={reference} placeholder={placeholder} type={type} />
      <span className="label">{label}</span>
      <span className="focus-bg"></span>
    </Form.Group>
  );
};

export default InputField;
