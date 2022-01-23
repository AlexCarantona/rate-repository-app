import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: 'hsla(0, 100%, 40%, 1)'
  },
  TextInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'hsla(240, 50%, 50%, 0.5)',
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
    padding: 10,
    margin: 4
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const textInputStyle = [
    styles.TextInput,
    showError && { borderColor:'hsla(0, 100%, 40%, 1)'},
  ]

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={textInputStyle}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;