import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_REPOS } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const {data, error, loading} = useQuery(GET_REPOS, {
    fetchPolicy: 'cache-and-network'
  })

  if (error) console.log(error);
  if (loading) return (<Text>Cargando...</Text>);


  return (
    <FlatList
      data={data.repositories.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => RepositoryItem(item)}
    />
  );
};

export default RepositoryList;