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
    <Form.Group className="mb-3 one-line" controlId="formBasicEmail">
      <Form.Label className="form-label">{label}</Form.Label>
      <Form.Control ref={reference} placeholder={placeholder} type={type} />
    </Form.Group>
  );
};

export default InputField;
