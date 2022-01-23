import { Image, StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

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

const RepositoryItem = (item) => {

    const i = item.node

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
        <View style={styles.container}>
            <View style={styles.upper}>
                <Image 
                    style={styles.image} 
                    source={{ uri: i.ownerAvatarUrl}} 
                />
                <View style={styles.upperData}>
                    <Text fontSize='heading' fontWeight='bold' style={{padding: 4}}>{i.fullName}</Text>
                    <View style={{flexDirection: 'row' }}>
                        <Text color='textSecondary' style={{ flex: 1, flexWrap: 'wrap'}}>{i.description}</Text>
                    </View>
                    <Text style={styles.tag}>{i.language}</Text>
                </View>
            </View>
            <View style={styles.variableData}>
                <MicroData number={i.stargazersCount} label='Stars' />
                <MicroData number={i.forksCount} label='Forks' />
                <MicroData number={i.reviews.totalCount} label='Reviews' />
                <MicroData number={i.ratingAverage} label='Rating' />
            </View>
        </View>
    )

};

export default RepositoryItem;