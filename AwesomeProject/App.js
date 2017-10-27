import React, { Component } from "react";
import { ActivityIndicator, Picker , ListView, Text, View } from "react-native";

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    return fetch("https://facebook.github.io/react-native/movies.json")
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.movies)
          },
          function() {
            // do something with new state
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
          <Picker selectedValue={this.state.language} onValueChange={(itemValue, itemIndex) => this.setState(
                { language: itemValue }
              )}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>;
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <Text>
              {rowData.title}, {rowData.releaseYear}
            </Text>
          )}
        />
      </View>
    );
  }
}
