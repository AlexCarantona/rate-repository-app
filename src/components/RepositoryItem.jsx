import { useQuery } from "@apollo/client";
import { Button, FlatList, Image, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import { GET_REPO } from "../graphql/queries";
import { openURL } from "expo-linking";
import theme from "../theme";
import Text from "./Text";
import { ItemSeparator } from "./RepositoryList";
import { format } from "date-fns";

const MicroData = ({number, label}) => {

    const parsedNumber = number > 1000 ? `${(number / 1000).toFixed(1)} k` : number

    const style = {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    }
    return (
        <View style={style}>
            <Text fontSize='heading' fontWeight='bold'>{parsedNumber}</Text>
            <Text>{label}</Text>
        </View>
    )
};

const ReviewItem = ({ item }) => {

    const styles = StyleSheet.create({
        reviewContainer: {
            flexDirection: "row",
            marginTop: 3
        },
        rating : {
            height: 40,
            width: 40,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            margin: 3
        },
        reviewInfo: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginRight: 4,
            flex: 1
        }
    })


    return (
    <View style={styles.reviewContainer} fullWidth> 
        <View style={styles.rating}><Text fontSize='subheading' fontWeight='bold' color='primary'>{item.rating}</Text></View>
        <View style={styles.reviewInfo} >
            <Text fontSize='subheading' fontWeight='bold'>{item.user.username}</Text>
            <Text>{format(new Date(item.createdAt), 'y.M.d')}</Text>
            <Text>{item.text}</Text>
        </View>
    </View>
    )
}

export const ReviewedRepo = () => {
    const { id } = useParams()
    const it = useQuery(GET_REPO, {variables: { id }});

    if (it.loading) return <View><Text>{'Loading...'}</Text></View>;

    const reviews = it.data.repository.reviews?.edges.map(rev => rev.node)

    return (<FlatList
        data={reviews}
        renderItem={({item}) => <ReviewItem item={item} />}
        keyExtractor={({ id}) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => <RepositoryItem item={it.data.repository} />}
        />
    )
}

const RepositoryItem = ({ item }) => {
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            backgroundColor: 'white'
        },
        upper: {
            flexDirection: 'row'
        },
        upperData: {
            flex: 3,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: 5,
        },
        variableData :{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10
        },
        image: {
            width: 75,
            height: 75,
            margin: 5,
            borderRadius: 5
        },
        tag: {
            marginTop: 5,
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            padding: 5,
            color: 'white'
        }
    })
    
    return (
        <View style={styles.container} testID="repoItem" key={item.id}>
            <View style={styles.upper}>
                <Image 
                    style={styles.image} 
                    source={{ uri: item.ownerAvatarUrl}} 
                />
                <View style={styles.upperData}>
                    <Text fontSize='heading' fontWeight='bold' style={{padding: 4}}>{item.fullName}</Text>
                    <View style={{flexDirection: 'row' }}>
                        <Text color='textSecondary' style={{ flex: 1, flexWrap: 'wrap'}}>{item.description}</Text>
                    </View>
                    <Text style={styles.tag}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.variableData}>
                <MicroData number={item.stargazersCount} label='Stars' />
                <MicroData number={item.forksCount} label='Forks' />
                <MicroData number={item.reviews?.totalCount} label='Reviews' />
                <MicroData number={item.ratingAverage} label='Rating' />
            </View>
            {item.url && <Button title="Open in GitHub" onPress={(e) => { e.preventDefault; openURL(item.url) }}/>}
        </View>
    )

};

export default RepositoryItem;