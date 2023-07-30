import { AUTHENTICATE } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import { useAuthStorage } from "../hooks/useAuthStorage";

//import { useContext } from "react";

//import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments

    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    return data.authenticate;
  };

  return [signIn, result];
};

export default useSignIn;
