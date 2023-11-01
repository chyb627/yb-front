import { useState } from 'react';

const useTextInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => setValue(e.target.value);

  return [value, onChangeText, setValue] as const;
};

export default useTextInput;
