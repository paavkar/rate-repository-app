import { Text as NativeText, StyleSheet } from "react-native";
import Constants from "expo-constants";

import theme from "../theme";

export const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  circleContainer: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  errorText: {
    color: "#d73a4a",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
  },
  repository: {
    alignItems: "stretch",
  },
  form: {
    alignItems: "stretch",
    backgroundColor: "white",
    paddingBottom: 10,
    input: {
      borderRadius: 4,
      borderWidth: 1,
      height: 40,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      paddingTop: 10,
      paddingLeft: 10,
      paddingBottom: 10,
    },
    text: {
      textAlign: "center",
      borderRadius: 4,
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: theme.colors.primary,
      color: "white",
    },
  },
  review: {
    flexDirection: "row",
    alignContent: "stretch",
    justifyContent: "space-evenly",
    marginTop: 10,
    view: {
      textAlign: "center",
      borderRadius: 4,
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 40,
      paddingRight: 40,
      backgroundColor: theme.colors.primary,
      color: "white",
    },
    delete: {
      justifyContent: "flex-end",
      text: {
        textAlign: "center",
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: "#d73a4a",
        color: "white",
      },
    },
  },
  avatarContainer: {
    flexGrow: 0,
  },
  flexContainer: {
    flexDirection: "row",
    flexGrow: 1,
  },
  flexContainerMain: {
    backgroundColor: "white",
    paddingBottom: 20,
  },
  infoContainer: {
    flexGrow: 1,
    marginTop: 15,
    flexShrink: 1,
  },
  flexItemC: {
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  flexItemB: {
    flexGrow: 0,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  flexItemA: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    alignSelf: "flex-start",
    padding: 4,
    borderRadius: 4,
  },
  appBar: {
    container: {
      paddingTop: Constants.statusBarHeight + 20,
      backgroundColor: theme.colors.textPrimary,
      flexDirection: "row",
      paddingBottom: 5,
    },
    text: {
      fontSize: theme.fontSizes.heading,
      color: "white",
      padding: 10,
    },
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "language" && styles.language,
    fontSize === "heading" && styles.fontSizeHeading,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
