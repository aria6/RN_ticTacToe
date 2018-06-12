import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  text: string,
  onPress: () => void,
};

export default function Button(props: Props) {
  let {text, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    padding: 10,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
