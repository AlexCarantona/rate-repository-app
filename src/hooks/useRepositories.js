import { useQuery  } from '@apollo/client';

import { GET_REPOS } from '../graphql/queries';

const useRepositories = (criteria = 'created', searchKeyword='') => {
  let orderBy;
  let orderDirection;

  switch(criteria) {
    case ('created'): orderBy = 'CREATED_AT'; orderDirection = 'DESC'; break;
    case ('ratingASC') : orderBy= 'RATING_AVERAGE'; orderDirection = 'ASC'; break;
    case ('ratingDESC') : orderBy= 'RATING_AVERAGE'; orderDirection = 'DESC'; break;
    default: ''
  }

  const variables = { orderBy, orderDirection, searchKeyword }
  const { data, loading, fetchMore } = useQuery(GET_REPOS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading
  };
};

export default useRepositories;