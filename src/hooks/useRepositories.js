import { useQuery } from '@apollo/client';

import { GET_REPOS } from '../graphql/queries';

const useRepositories = () => {
  const { data, ...result } = useQuery(GET_REPOS, {
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;