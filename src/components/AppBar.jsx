import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
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
  return (
    <View style={styles.appBar.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text fontWeight="bold" style={styles.appBar.text}>
            Repositories
          </Text>
        </Link>
        <Link to="/login">
          <Text fontWeight="bold" style={styles.appBar.text}>
            Sign In
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
