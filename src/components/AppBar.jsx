import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';


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
  return <View style={styles.container}>
      <ScrollView horizontal style={styles.scroller}>
        <AppTab text='Repositories' link='/'/>
        <AppTab text='Sign In' link='/signin'/>
      </ScrollView>
      </View>;
};

export default AppBar;