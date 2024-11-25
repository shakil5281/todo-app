// src/components/Input.jsx

import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`px-4 py-2 border rounded focus:outline-none focus:ring ${className}`}
      {...props}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default Input;
