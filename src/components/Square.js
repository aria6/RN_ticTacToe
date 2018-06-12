import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  isDraw: boolean,
  isWinnerLine: boolean,
  value: ?string,
  onPress: () => void,
};

function Square(props: Props) {
  let {value, onPress, isWinnerLine, isDraw} = props;
  let squareColor =
    isWinnerLine || isDraw ? {backgroundColor: '#cecece'} : null;
  return (
    <TouchableOpacity
      style={[styles.squareContainer, squareColor]}
      onPress={onPress}
    >
      <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
  );
}

export default Square;

let styles = StyleSheet.create({
  squareContainer: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderRadius: 3,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 60,
  },
});
