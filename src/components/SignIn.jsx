import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from './formikTextInput';
import CustomButton from './CustomButton';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';


export const SignInForm = ({ onSubmit }) => {
    
    const validationSchema = yup.object().shape({
      username: yup.string().required('You must enter a valid username.'),
      password: yup.string().required('You must provide a password to login.')
    })
  return (
    <Formik initialValues={{username: '', password:''}} onSubmit={onSubmit} validationSchema={validationSchema} >
    {({ handleSubmit }) =>
      <View>
        <FormikTextInput name='username' placeholder='Username...' />
        <FormikTextInput secureTextEntry={true} name='password' placeholder='Password...' />
        <CustomButton onPress={handleSubmit} label='Log in' />
      </View>
    }
    </Formik>
  )
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
    <SignInForm onSubmit={onSubmit} />
    )
  };

export default SignIn;