import { StyleSheet, View } from 'react-native';
import { Routes, Route, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import { ReviewedRepo } from './RepositoryItem';
import RepositoryList from './RepositoryList';
import Review from './Review';
import SignIn from './SignIn';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8"
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
    <AppBar />
    <Routes>
      <Route path='/' element={<RepositoryList />} exact/>
      <Route path='/signup' element={<SignUp />} exact />
      <Route path='/signin' element={<SignIn />} exact/>
      <Route path='/review' element={<Review />} exact />
      <Route path='/:id' element={<ReviewedRepo/>} exact />
      <Route path='*' element={<Navigate to='/' replace/>}/>
    </Routes>
    </View>
  );
};

export default Main;