import { ReviewItem } from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { FlatList, View} from "react-native";
import Text from "./Text";

const ReviewsList = () => {
    const { loading, data } = useQuery(ME, {variables: {includeRevs: true}});

    if (loading) return <View><Text>Loading...</Text></View>

    const revs = data.me?.reviews ? data.me.reviews.edges.map(edge => edge.node) : []

    return <FlatList
        data={revs}
        renderItem={({item}) => (<ReviewItem item={item} />)}
    />
}

export default ReviewsList