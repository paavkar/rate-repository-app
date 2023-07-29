import { View, Pressable } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";

import { styles } from "./Text";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <View style={styles.signIn}>
        <FormikTextInput style={styles.signIn.input} name="username" placeholder="Username" />
        <FormikTextInput
          style={styles.signIn.input}
          secureTextEntry
          name="password"
          placeholder="Password"
        />
      </View>
      <View style={styles.signIn}>
        <Pressable onPress={onSubmit}>
          <Text style={styles.signIn.text}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
