import { View, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-native";

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
  const navigate = useNavigate();

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
    navigate("/")
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
          <View style={{flexDirection: "row"}}>

            <Pressable onPress={() => navigate("/create")}>
              <Text fontWeight="bold" style={styles.appBar.text}>
                Create a review
              </Text>
            </Pressable>

            <Pressable onPress={() => navigate("/reviews")}>
              <Text fontWeight="bold" style={styles.appBar.text}>
                My reviews
              </Text>
            </Pressable>

            <Pressable onPress={() => SignOut()}>
              <Text fontWeight="bold" style={styles.appBar.text}>
                Sign Out
              </Text>
            </Pressable>

          </View>
        ) : (
          <View style={{flexDirection: "row"}}>
            <Link to="/login">
            <Text fontWeight="bold" style={styles.appBar.text}>
              Sign In
            </Text>
          </Link>
          <Link to="/register">
          <Text fontWeight="bold" style={styles.appBar.text}>
            Sign Up
          </Text>
        </Link>
          </View>
          
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
