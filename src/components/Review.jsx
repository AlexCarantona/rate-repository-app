import { Formik } from "formik"
import { View } from "react-native"
import CustomButton from "./CustomButton"
import FormikTextInput from "./formikTextInput"
import * as yup from 'yup';
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";


const ReviewForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput name='repoOwner' placeholder='Repository owner...' />
            <FormikTextInput name='repoName' placeholder='Repository name...' />
            <FormikTextInput name='rating' placeholder='Rating from 0 to 100...' />
            <FormikTextInput multiline={true} name='reviewText' placeholder='Your review...' />
            <CustomButton onPress={onSubmit} label='Submit review' />
        </View>
    )
}
const Review = () => {
    const [create] = useMutation(CREATE_REVIEW)
    const navigate = useNavigate()

    const handleReview = async (values) => {
        await create({
            variables: {
                review : {
                    repositoryName: values.repoName,
                    ownerName: values.repoOwner,
                    rating: parseInt(values.rating),
                    text: values.reviewText
                }
            },
          onCompleted : (data) => {navigate(data.createReview.repositoryId)}
        })

    };

    const validationSchema = yup.object().shape({
        repoOwner: yup.string().required('You must provide a valid repository owner name.'),
        repoName: yup.string().required('You must provide a repository name'),
        rating: yup.number().min(0).max(100).required('You must provide a number from 0 to 100')
    })

    return (
        <Formik
            initialValues={{
                repoOwner : '',
                repoName: '',
                rating: '0',
                reviewText: ''
            }}
            onSubmit={handleReview}
            validationSchema={validationSchema}
        >
            {({handleSubmit}) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    )

}

export default Review