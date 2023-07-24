import React from 'react';

interface FormProps {
  property: string;
}

const Form: React.FC<FormProps> = ({ property }) => {
  return (
    <React.Fragment>
      <h1>Growdev</h1>
      <p>{property}</p>
    </React.Fragment>
  );
};

export default Form;
