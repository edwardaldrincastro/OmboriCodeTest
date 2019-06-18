import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'

export default function Users({ data }) {
  const { index, item } = data;
  return (
    <View key={index} style={styles.card}>
      <View>
        <Image source={{ uri: item.avatar }} style={styles.avatar}>
        </Image>
      </View>
      <View style={styles.details}>
        <Text>{`${item.first_name} ${item.last_name}`} </Text>
        <Text>{item.email}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  card: {
    height: 96,
    width: "100%",
    marginHorizontal: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 100
  },
  details: {
    marginLeft: 15,
    paddingTop: 10,
    height: "100%"
  }
})