import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { View, FlatList, StyleSheet } from "react-native";
import Text from "./Text";
import { styles } from "./Text";
import useReviews from "../hooks/useReviews";

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  return <RepositoryItem item={repository} />;
};

const styles2 = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles2.separator} />;

const ReviewItem = ({ review }) => {
  // Single review item
  const date = new Date(review.createdAt);

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
            {review.user.username}
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
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useReviews({id: id, first: 10});

  try {
    const reviews = repository.reviews.edges.map((edge) => edge.node);

    const onEndReach = () => {
      fetchMore();
    };

    return (
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => (
          <View>
            <RepositoryInfo repository={repository} />
            <View style={styles2.separator} />
          </View>
        )}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        // ...
      />
    );
  } catch (error) {
    console.log(error)
    return <Text>error in repository fetching</Text>;
  }
};

export default SingleRepository;
