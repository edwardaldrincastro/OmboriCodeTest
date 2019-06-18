import React, { Component, Fragment } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import Pulse from "./components/Pulse";
import Users from "./components/Users";
import { getAllUsers } from "./helpers/api";

export class App extends Component {
  state = {
    users: [],
    page: 0,
    isFetching: true,
    total: 0
  }

  fetchUsers = async () => {
    this.setState({
      isFetching: true,
    })
    const { page, users } = this.state
    const response = await getAllUsers(page + 1, 8, 5)
    let userState = users;
    userState = userState.concat(response.data);

    await this.setState({
      users: userState,
      page: response.page,
      isFetching: false,
      total: response.total
    })
  }

  renderFooter = () => {
    if (this.state.users.length < this.state.total) {
      return <ActivityIndicator style={{ marginBottom: 10 }} />
    } else {
      return (
        <View style={styles.footer}><Text>No more users</Text></View>)
    }
  }

  handleLoadMore = () => {
    this.state.users.length < this.state.total ? this.fetchUsers() : console.log("No more data")
  }

  componentDidMount() {
    setTimeout(() => { return (this.state.page === 0 ? this.fetchUsers() : null) }, 3000);
  }

  render({ users } = this.state) {
    return (
      <View style={styles.container}>
        {this.state.page === 0
          ?
          <Pulse />
          :
          <Fragment>
            <View style={styles.header}><Text style={styles.headerTitle}>Users</Text></View>
            <FlatList
              style={{ height: "100%", width: "100%"}}
              data={users}
              renderItem={(data) =>
                <Users data={data} />
              }
              keyExtractor={(item, index) => index.toString()}
              onScrollEndDrag={() => this.handleLoadMore()}
              ListFooterComponent={this.renderFooter} />
          </Fragment>}

      </View>

    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  header: {
    height: 60,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#F3F3F3",
    backgroundColor: "#F9F9F9",
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24
  }
})