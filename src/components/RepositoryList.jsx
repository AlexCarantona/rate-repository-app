import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repos }) => {

  const repoNodes = repos 
    ? repos.edges.map((edge) => edge.node) :
    []

  const navigate = useNavigate()

  return (
    <FlatList
      data={repoNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
      <Pressable onPress={(e) => {e.preventDefault(); navigate(`/${item.id}`)}}> 
        <RepositoryItem item={item} /> 
      </Pressable>)}
    />
  );
}

const RepositoryList = () => {

  const { repositories } = useRepositories()

  return <RepositoryListContainer repos={repositories}/>


};

export default RepositoryList;