import { TextInput as NativeTextInput } from "react-native";

//const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error ? { borderColor: "#d73a4a" } : {}];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
