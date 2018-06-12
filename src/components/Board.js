import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Square from './Square';

type WinnerLine = ?{
  lines: Array<number>,
  value: string,
};

type Props = {
  isDraw: boolean,
  squares: Array<?string>,
  winnerLine: WinnerLine,
  onPress: (i: index) => void,
};

class Board extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {this._renderSquare(0)}
          {this._renderSquare(1)}
          {this._renderSquare(2)}
        </View>
        <View style={styles.row}>
          {this._renderSquare(3)}
          {this._renderSquare(4)}
          {this._renderSquare(5)}
        </View>
        <View style={styles.row}>
          {this._renderSquare(6)}
          {this._renderSquare(7)}
          {this._renderSquare(8)}
        </View>
      </View>
    );
  }

  _renderSquare = (i: number) => {
    let {squares, onPress, winnerLine, isDraw} = this.props;
    return (
      <Square
        value={squares[i]}
        onPress={() => onPress(i)}
        isWinnerLine={winnerLine && winnerLine.includes(i)}
        isDraw={isDraw}
      />
    );
  };
}

export default Board;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
