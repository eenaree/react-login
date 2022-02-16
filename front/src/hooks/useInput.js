import { useState } from 'react';

const useInput = initialState => {
  const [value, setValue] = useState(initialState);
  const onChangeValueHandler = e => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return [value, onChangeValueHandler];
};

export default useInput;
