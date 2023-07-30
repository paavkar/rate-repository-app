import { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

import Text from "../components/Text";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  //const [loadings, setLoading] = useState(false);

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const fetchRepositories = () => {
    /*setLoading(true);

    // Replace the IP address part with your own IP address!
    const response = await fetch("http://192.168.1.113:5000/api/repositories");
    const json = await response.json();
    */

    if (loading && !data) {
      return <Text>loading...</Text>;
    }

    const repos = data.repositories;
    //setLoading(false);
    setRepositories(repos);
  };

  useEffect(() => {
    fetchRepositories();
  }, [data]);

  return { repositories };
};

export default useRepositories;
