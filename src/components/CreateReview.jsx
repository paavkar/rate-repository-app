import { View, Pressable } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import { styles } from "./Text";

import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const initialValues = {
  repositoryName: "",
  ownerName: "",
  rating: null,
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's name is required"),
  repositoryName: yup.string().required("Repository's full name is required"),
  rating: yup.number().min(0).max(100).required("Rating for the repository is required"),
  text: yup.string(),
});

export const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <View style={styles.form}>
        <FormikTextInput
          style={styles.form.input}
          name="ownerName"
          placeholder="Repository owner name"
        />
        <FormikTextInput
          style={styles.form.input}
          name="repositoryName"
          placeholder="Repository name"
        />
        <FormikTextInput
          style={styles.form.input}
          name="rating"
          placeholder="Rating between 0 and 100"
        />
        <FormikTextInput style={styles.form.input} name="text" multiline placeholder="Review" />
      </View>
      <View style={styles.form}>
        <Pressable onPress={onSubmit}>
          <Text style={styles.form.text}>Create a review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const CreateReview = () => {
  const [addReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const { data } = await addReview({
        variables: { review: { repositoryName, ownerName, rating: parseInt(rating), text } },
      });
      const review = data.createReview;
      navigate(`/repository/${review.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default CreateReview;
