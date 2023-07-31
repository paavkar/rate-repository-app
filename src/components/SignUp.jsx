import { View, Pressable } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import { useMutation } from "@apollo/client";

import useSignIn from "../hooks/useSignIn";

import { REGISTER } from "../graphql/mutations";

import { styles } from "./Text";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("Username is required"),
  password: yup.string().min(5).max(30).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

export const SignUpForm = ({ onSubmit }) => {
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
        <FormikTextInput
          style={styles.form.input}
          secureTextEntry
          name="passwordConfirmation"
          placeholder="Password confirmation"
        />
      </View>
      <View style={styles.form}>
        <Pressable onPress={onSubmit}>
          <Text style={styles.form.text}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useMutation(REGISTER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;
