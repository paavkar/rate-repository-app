import { View, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { useApolloClient } from "@apollo/client";
import { useAuthStorage } from "../hooks/useAuthStorage";

import Text from "./Text";
import { styles } from "./Text";

/* Not used, styles imported from Text.jsx
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    paddingBottom: 20,
    // ...
  },
  text: {
    fontSize: 16,
    color: "white",
    paddingLeft: 10,
  },
});*/

const AppBar = () => {
  const { data } = useQuery(GET_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  let user = null;

  /**
   * try to set user to the query's result
   * upon error set user to null
   * so the sign in is displayed
   * in the app bar
   */
  try {
    user = data.me;
  } catch (error) {
    user = null;
  }

  const SignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.appBar.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text fontWeight="bold" style={styles.appBar.text}>
            Repositories
          </Text>
        </Link>
        {user ? (
          <Pressable onPress={() => SignOut()}>
            <Text fontWeight="bold" style={styles.appBar.text}>
              Sign Out
            </Text>
          </Pressable>
        ) : (
          <Link to="/login">
            <Text fontWeight="bold" style={styles.appBar.text}>
              Sign In
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
