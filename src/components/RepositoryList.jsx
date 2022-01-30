import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const criteriaPicker = ({ criteria, setCriteria, searchString, setString}) =>{

  return (
    <View>
      <Searchbar onChangeText={setString} value={searchString} />
    <Picker
      selectedValue={criteria}
      onValueChange= {(itemValue) => setCriteria(itemValue)}
      mode='dropdown'
    >
      <Picker.Item label='Latest repositories' value='created'/>
      <Picker.Item label='Highest rated repositories' value='ratingDESC' />
      <Picker.Item label='Lowest rated repositories' value='ratingASC' />
    </Picker>
</View>)}


const RepositoryList = () => {

  const [criteria, setCriteria] = useState('created')
  const [searchString, setString] = useState('')
  
  const {repositories} = useRepositories(criteria, searchString)

  const navigate = useNavigate()
  
  
  let repoNodes = repositories
  ? repositories.edges.map((edge) => edge.node) :
  []

return (
  <FlatList
    data={repoNodes}
    ItemSeparatorComponent={ItemSeparator}
    ListHeaderComponent={criteriaPicker({ criteria, setCriteria, searchString, setString })}
    renderItem={({item}) => (
    <Pressable onPress={(e) => {e.preventDefault(); navigate(`/${item.id}`)}}> 
      <RepositoryItem item={item} /> 
    </Pressable>)}
  />
);


};

export default RepositoryList;