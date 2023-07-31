import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import Text from "./Text";
import { styles } from "./Text";
import { useNavigate } from "react-router-native";

const styles2 = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles2.separator} />;

const UserReviewItem = ({ review, refetch }) => {
  // Single review item
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();
  const date = new Date(review.createdAt);

  const reviewDeletion = async () => {
    await deleteReview({ variables: { deleteReviewId: review.id } })
    refetch()
  }

  return (
    <View style={styles.flexContainerMain}>
      <View style={styles.flexContainer}>
        <View style={styles.circleContainer}>
          <Text color="primary" fontWeight="bold">
            {review.rating}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="heading" style={{ marginBottom: 5 }}>
            {review.repository.fullName}
          </Text>
          <Text fontSize="body" style={{ marginBottom: 5 }}>
            {`${date.getUTCDate().toString().padStart(2, "0")}.${(date.getUTCMonth() + 1)
              .toString()
              .padStart(2, "0")}.${date.getUTCFullYear()}`}
          </Text>
          <Text fontSize="body" style={{ marginBottom: 5 }}>
            {review.text}
          </Text>
        </View>
      </View>

      <View style={styles.review}>
        <Pressable onPress={() => navigate(`/repository/${review.repository.id}`)}>
          <Text style={styles.review.view}>View Repository</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            Alert.alert("Delete review", "Are you sure you want to delete this review?", [
              {
                text: "CANCEL",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "DELETE",
                onPress: () => reviewDeletion(),
              },
            ])
          }
        >
          <Text style={styles.review.delete.text}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const { data, refetch } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  try {
    const user = data.me;
    const reviews = user.reviews.edges.map((edge) => edge.node);

    return (
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <UserReviewItem review={item} refetch={refetch} />}
        keyExtractor={({ id }) => id}
        // ...
      />
    );
  } catch (error) {
    return <Text>reviews not found</Text>;
  }
};

export default UserReviews;
