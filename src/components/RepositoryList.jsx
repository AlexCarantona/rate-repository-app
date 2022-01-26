import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repos }) => {

  const repoNodes = repos 
    ? repos.edges.map((edge) => edge.node) :
    []

  return (
    <FlatList
      data={repoNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => RepositoryItem(item)}
    />
  );
}

const RepositoryList = () => {

  const { repositories } = useRepositories()

  return <RepositoryListContainer repos={repositories}/>


};

export default RepositoryList;