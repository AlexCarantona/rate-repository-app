import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from './formikTextInput';
import CustomButton from './CustomButton';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup.string().required('You must enter a valid username.'),
  password: yup.string().required('You must provide a password to login.')
})


const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='username' placeholder='Username...' />
      <FormikTextInput secureTextEntry name='password' placeholder='Password...' />
      <CustomButton onPress={onSubmit} label='Log in' />
    </View>
  )
}

const initialValues= {
  username: '',
  password:''
}

const SignIn = () => {
  const navigate = useNavigate()
  const [signin] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values 
    try {
     await signin({username, password})
     navigate('/', { replace: true})
    } catch (e){ console.log(e)}
  }

  return (
  <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/> }
  </Formik>)};

export default SignIn;