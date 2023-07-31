import { useState } from "react";
import React from "react";

import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListHeader = ({
  selectedOrderOption,
  setSelectedOrderOption,
  searchKeyword,
  onChangeSearch,
}) => {
  return (
    <View>
      <Searchbar placeholder="Search..." onChangeText={onChangeSearch} value={searchKeyword} />
      <Picker
        selectedValue={selectedOrderOption}
        onValueChange={(itemValue, itemIndex) => setSelectedOrderOption(itemValue)}
      >
        <Picker.Item label="Select an item..." enabled={false} style={{ color: "grey" }} />
        <Picker.Item label="Latest repositories" value="latest" style={{ color: "black" }} />
        <Picker.Item
          label="Highest rated repositories"
          value="highest"
          style={{ color: "black" }}
        />
        <Picker.Item label="Lowest rated repositories" value="lowest" style={{ color: "black" }} />
      </Picker>
    </View>
  );
};

/**
 * Old definition of the list container
 */
export const RepositoryListContainerOld = ({ repositories, navigate }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    const selectedOrderOption = props.selectedOrderOption;
    const setSelectedOrderOption = props.setSelectedOrderOption;
    const searchKeyword = props.searchKeyword;
    const onChangeSearch = props.onChangeSearch;
    // ...

    return (
      <RepositoryListHeader
        selectedOrderOption={selectedOrderOption}
        setSelectedOrderOption={setSelectedOrderOption}
        searchKeyword={searchKeyword}
        onChangeSearch={onChangeSearch}
      />
    );
  };

  render() {
    return (
      <FlatList
        style={{ marginBottom: 80 }}
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => this.props.navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedOrderOption, setSelectedOrderOption] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [value] = useDebounce(searchKeyword, 500);
  const onChangeSearch = (query) => setSearchKeyword(query);
  const { repositories, fetchMore } = useRepositories(selectedOrderOption, searchKeyword);
  const navigate = useNavigate();
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View>
      <RepositoryListContainer
        repositories={repositoryNodes}
        selectedOrderOption={selectedOrderOption}
        setSelectedOrderOption={setSelectedOrderOption}
        searchKeyword={searchKeyword}
        onChangeSearch={onChangeSearch}
        navigate={navigate}
        onEndReach={onEndReach}
      />
    </View>
  );
};

export default RepositoryList;
