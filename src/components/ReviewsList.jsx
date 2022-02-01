import { ReviewItem } from "./RepositoryItem";
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { Alert, FlatList, View} from "react-native";
import Text from "./Text";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

const ReviewsList = () => {
    const { loading, data } = useQuery(ME, {variables: {includeRevs: true}});
    const [ deleteMutation ] = useMutation(DELETE_REVIEW, {refetchQueries: [ME]})
    const navigate = useNavigate()

    const deleteRev = (id) => {
        Alert.alert('Deleting', 
        'Are you sure you want to delete this review?', 
        [{ text: 'CANCEL'}, { text: 'YES', onPress: () => deleteMutation({ variables: { review: id } })}])

        }


    if (loading) return <View><Text>Loading...</Text></View>

    const revs = data.me?.reviews ? data.me.reviews.edges.map(edge => edge.node) : []

    return <FlatList
        data={revs}
        renderItem={({item}) => (
            <View>
                <ReviewItem item={item} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch'}}>
                    <CustomButton onPress={(e) => {e.preventDefault(); navigate(`/${item.repository.id}`)}} label='Visit' style={{flex: 1}}/>
                    <CustomButton 
                        onPress={(e) => {
                            e.preventDefault(); 
                            deleteRev(item.id)
                        }} 
                                label='Delete' 
                                style={{flex: 1, backgroundColor: 'red' }} 
                            />
                </View>
            </View>
        
        )}
    />
}

export default ReviewsList