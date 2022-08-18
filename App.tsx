import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { Component } from "react";

export default class App extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async getMovies() {
    try {
      const response = await fetch("https://reactnative.dev/movies.json");
      const json = await response.json();
      this.setState({
        data: json.movies,
        text: json.title,
        desc: json.description,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text style={styles.title}>{this.state.text}</Text>
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text style={styles.movieText}>
                  {item.id}) {item.title}, {item.releaseYear}
                </Text>
              )}
            />
            <Text style={styles.description}>{this.state.desc}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
    borderBottomWidth: 2,
  },
  description: { color: "green" },
  movieText: {
    fontSize: 20,
    padding: 10,
    fontWeight: "300",
  },
});
