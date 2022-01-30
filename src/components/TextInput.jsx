import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} textAlignVertical='top' {...props} />;
};

export default TextInput;