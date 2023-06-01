import React from 'react';

import Form from 'react-bootstrap/Form';

import './InputField.scss';

type InputFieldProps = {
  reference: React.RefObject<HTMLInputElement>;
  placeholder: string;
  label?: string;
  type?: string;
  readOnlyValue?: boolean;
  defaultValue?: string;
  className: string;
};

const InputField = ({
  reference,
  placeholder,
  label,
  type,
  readOnlyValue,
  className,
}: InputFieldProps) => {
  return (
    <Form.Group className={className} controlId="formBasicEmail">
      <Form.Control
        className={`disabled-${readOnlyValue}`}
        ref={reference}
        placeholder={placeholder}
        type={type}
        plaintext={readOnlyValue}
        readOnly={readOnlyValue}
      />
      <span className="label">{label}</span>
      <span className="focus-bg"></span>
    </Form.Group>
  );
};

export default InputField;
