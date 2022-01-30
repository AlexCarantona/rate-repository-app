import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const criteriaPicker = ({ criteria, setCriteria}) =>{

  return (
<Picker
  selectedValue={criteria}
  onValueChange= {(itemValue) => setCriteria(itemValue)}
>
  <Picker.Item label='Latest repositories' value='created'/>
  <Picker.Item label='Highest rated repositories' value='ratingDESC' />
  <Picker.Item label='Lowest rated repositories' value='ratingASC' />
</Picker>)}


const RepositoryList = () => {

  const [criteria, setCriteria] = useState('created')
  
  const {repositories} = useRepositories(criteria)

  const navigate = useNavigate()
  
  
  let repoNodes = repositories
  ? repositories.edges.map((edge) => edge.node) :
  []

return (
  <FlatList
    data={repoNodes}
    ItemSeparatorComponent={ItemSeparator}
    ListHeaderComponent={criteriaPicker({ criteria, setCriteria })}
    renderItem={({item}) => (
    <Pressable onPress={(e) => {e.preventDefault(); navigate(`/${item.id}`)}}> 
      <RepositoryItem item={item} /> 
    </Pressable>)}
  />
);


};

export default RepositoryList;