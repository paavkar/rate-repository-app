import { View, Image } from "react-native";
import Text from "./Text";
import { styles } from "./Text";

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.flexContainerMain}>
      <View style={styles.flexContainer}>
        <View style={styles.avatarContainer}>
          <Image
            style={{ width: 45, height: 45, borderRadius: 5, margin: 15 }}
            source={{ uri: `${item.ownerAvatarUrl}` }}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="heading" style={{ marginBottom: 5 }}>
            {item.fullName}
          </Text>
          <Text fontSize="body" style={{ marginBottom: 5 }}>
            {item.description}
          </Text>
          <Text color="language" style={{ marginBottom: 5 }}>
            {item.language}
          </Text>
        </View>
      </View>

      <View style={styles.flexItemA}>
        <View style={styles.flexItemB}>
          <View style={styles.flexItemC}>
            {item.stargazersCount > 1000 ? (
              <Text fontWeight="bold">{(item.stargazersCount / 1000).toFixed(1)}k</Text>
            ) : (
              <Text fontWeight="bold">{item.stargazersCount}</Text>
            )}
          </View>

          <Text fontSize="body">Stars</Text>
        </View>

        <View style={styles.flexItemB}>
          <View style={styles.flexItemC}>
            {item.forksCount > 1000 ? (
              <Text fontWeight="bold">{(item.forksCount / 1000).toFixed(1)}k</Text>
            ) : (
              <Text fontWeight="bold">{item.forksCount}</Text>
            )}
          </View>

          <Text fontSize="body">Forks</Text>
        </View>

        <View style={styles.flexItemB}>
          <View style={styles.flexItemC}>
            {item.reviewCount > 1000 ? (
              <Text fontWeight="bold">{(item.reviewCount / 1000).toFixed(1)}k</Text>
            ) : (
              <Text fontWeight="bold">{item.reviewCount}</Text>
            )}
          </View>

          <Text fontSize="body">Reviews</Text>
        </View>

        <View style={styles.flexItemB}>
          <View style={styles.flexItemC}>
            {item.ratingAverage > 1000 ? (
              <Text fontWeight="bold">{(item.ratingAverage / 1000).toFixed(1)}k</Text>
            ) : (
              <Text fontWeight="bold">{item.ratingAverage}</Text>
            )}
          </View>

          <Text fontSize="body">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
