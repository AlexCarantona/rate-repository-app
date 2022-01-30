import { useQuery } from '@apollo/client';

import { GET_REPOS } from '../graphql/queries';

const useRepositories = (criteria='created', searchKeyword='') => {
  let orderBy;
  let orderDirection;
  switch(criteria) {
    case ('created'): orderBy = 'CREATED_AT'; orderDirection = 'DESC'; break;
    case ('ratingASC') : orderBy= 'RATING_AVERAGE'; orderDirection = 'ASC'; break;
    case ('ratingDESC') : orderBy= 'RATING_AVERAGE'; orderDirection = 'DESC'; break;
    default: ''
  }

  const { data, ...result } = useQuery(GET_REPOS, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;