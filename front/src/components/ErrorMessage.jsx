import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const ErrorMessage = ({ message }) => {
  return (
    <p
      css={css`
        color: red;
      `}
    >
      {message}
    </p>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
