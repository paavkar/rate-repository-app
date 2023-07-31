import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";


const useRepositories = (selectedOrderOption, searchKeyword) => {
  let orderBy = "";
  let orderDirection = "";

  if (selectedOrderOption == "latest") {
    orderBy = "CREATED_AT";
    orderDirection = "DESC";
  } else if (selectedOrderOption == "highest") {
    orderBy = "RATING_AVERAGE";
    orderDirection = "DESC";
  } else if (selectedOrderOption == "lowest") {
    orderBy = "RATING_AVERAGE";
    orderDirection = "ASC";
  }

  const variables = { orderDirection: orderDirection, orderBy: orderBy, searchKeyword: searchKeyword, first: 20 };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
