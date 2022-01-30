import FormikTextInput from "./formikTextInput"
import { View } from "react-native"
import CustomButton from "./CustomButton"
import { Formik } from "formik"
import * as yup from 'yup'
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../graphql/mutations"
import useSignin from "../hooks/useSignIn"
import { useNavigate } from "react-router-native"

const SignUpForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput name='username' placeholder='Username...' />
            <FormikTextInput secureTextEntry name='password' placeholder='Password...' />
            <FormikTextInput secureTextEntry name='confirmPassword' placeholder='Confirm password... ' />
            <CustomButton onPress={onSubmit} label='Register' />
        </View>
    )
}

const SignUp = () => {
    
    const [register] = useMutation(CREATE_USER)
    const [signin] = useSignin()
    const navigate = useNavigate()

    const validationSchema = yup.object().shape({
        username: yup.string().min(1).max(30).required('You must provide a username'),
        password: yup.string().min(5).max(50).required('You must provide a valid password'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null])
        .required('Password confirm is required')
    })

    const registerUser = async ({ username, password}) => {
        await register({
            variables: { user: {username, password}},
            onCompleted: async (data) => {
                try {
                await signin({username: data.createUser.username, password})
                navigate('/', {replace: true})
                } catch(error) {console.log(error)}
            }
        })
    }

    return (
    <Formik
        initialValues={{
            username: '',
            password: '',
            confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={registerUser}
    >
        {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>)
}

export default SignUp;