import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgrounds.appBar,
  },
  scroller: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row'
  },
  tab: {
    padding: 7
  }
});

const AppTab = ({text, link}) => 
  <Link to={link} style={styles.tab}>
    <Text color="nav" fontSize='heading'>{text}</Text> 
  </Link>;

const AppBar = () => {
  const authstorage = useAuthStorage()
  const client = useApolloClient()
  const { data, loading, error } = useQuery(ME)
  if (loading) return (<Text>Cargando...</Text>);
  if (error) console.log(error)
  if (data) console.log(data)
  
  return <View style={styles.container}>
      <ScrollView horizontal style={styles.scroller}>
        <AppTab text='Repositories' link='/'/>
        {data.me !== null ? <Pressable onPressOut={() => {authstorage.removeAccessToken(); client.resetStore()}}><Text color='primary'>Sign Out</Text></Pressable> : <AppTab text='Sign In' link='/signin'/>}
      </ScrollView>
      </View>;
};

export default AppBar;