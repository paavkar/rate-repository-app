import { View, Pressable } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import useSignIn from "../hooks/useSignIn";

import { styles } from "./Text";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <View style={styles.form}>
        <FormikTextInput style={styles.form.input} name="username" placeholder="Username" />
        <FormikTextInput
          style={styles.form.input}
          secureTextEntry
          name="password"
          placeholder="Password"
        />
      </View>
      <View style={styles.form}>
        <Pressable onPress={onSubmit}>
          <Text style={styles.form.text}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
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
