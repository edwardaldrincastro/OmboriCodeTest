import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'

export class Pulse extends Component {
  state = {
    bigPulse: new Animated.Value(1),
    smallPulse: new Animated.Value(1)
  }
  animation = () => {
    this.state.bigPulse.setValue(1);
    this.state.smallPulse.setValue(1);
    Animated.parallel([
      Animated.timing(
        this.state.bigPulse,
        {
          toValue: 0,
          duration: 2000
        }
      ),
      Animated.timing(
        this.state.smallPulse,
        {
          toValue: 0,
          duration: 2500,
          delay: 500
        }
      )
    ]).start(this.animation.bind(this)
    );
  }
  componentDidMount() {
    this.animation()
  }
  render() {
    const { bigPulse, smallPulse } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mainCircle}></View>
        <Animated.View
          style={{
            backgroundColor: "#7FB900",
            borderRadius: 100,
            opacity: bigPulse.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.2]
            }),
            position: 'absolute',
            height: bigPulse.interpolate({
              inputRange: [0, 1],
              outputRange: [128, 32]
            }),
            width: bigPulse.interpolate({
              inputRange: [0, 1],
              outputRange: [128, 32]
            })
          }}>
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: "#7FB900",
            borderRadius: 100,
            opacity: smallPulse.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.2]
            }),
            position: 'absolute',
            height: smallPulse.interpolate({
              inputRange: [0, 1],
              outputRange: [128, 0]
            }),
            width: smallPulse.interpolate({
              inputRange: [0, 1],
              outputRange: [128, 0]
            })
          }}>
        </Animated.View>
      </View >
    )
  }
}

export default Pulse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCircle: {
    height: 16,
    width: 16,
    backgroundColor: "#7FB900",
    borderRadius: 100,
    position: 'absolute'
  }
})
