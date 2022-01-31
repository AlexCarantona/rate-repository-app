import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
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
  {
  return (<Link to={link} style={styles.tab}>
    <Text color="nav" fontSize='heading'>{text}</Text> 
  </Link>)};

const AppBar = () => {
  const authstorage = useAuthStorage()
  const client = useApolloClient()
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(ME)
  if (loading) return (<Text>Cargando...</Text>);
  if (error) console.log(error)
  
  return <View style={styles.container}>
      <ScrollView horizontal style={styles.scroller}>
        <AppTab text='Repositories' link='/'/>
        {data.me !== null ?
        <View style={{flexDirection: 'row'}}>
         <Pressable style={styles.tab} onPressOut={() => {authstorage.removeAccessToken(); client.resetStore(); navigate('/')}}>
           <Text color='nav' fontSize='heading'>Sign Out</Text>
          </Pressable> 
          <AppTab text='My reviews' link='/reviews' />
          <AppTab text='Create review' link='/review' />
          </View>
          : 
          <View style={{flexDirection: 'row'}}>
            <AppTab text='Sign In' link='/signin'/> 
            <AppTab text='Sign Up' link='/signup'/>
          </View>}
      </ScrollView>
      </View>;
};

export default AppBar;