import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button} from './core-ui/';

import Board from './components/Board';
import calculateWinner from './helpers/calculateWinner';

type History = {
  squares: Array<?string>,
};

type State = {
  history: Array<History>,
  stepNumber: number,
  xIsNext: boolean,
};

export default class App extends Component<null, State> {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  };

  render() {
    let {history, stepNumber, xIsNext} = this.state;
    let current = history[stepNumber];
    let winner = calculateWinner(current.squares);
    let isDraw = stepNumber === 9 && !winner;

    let textSubHeader1 = isDraw
      ? 'Hasilnya Seri'
      : winner ? 'Pemenangnya Adalah' : 'Sekarang Giliran Jalan';
    let textSubHeader2 = isDraw
      ? ''
      : winner ? winner.value : xIsNext ? 'X' : 'O';

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>TIC TAC TOE</Text>
          <View style={styles.subHeader}>
            <Text style={styles.textSize}>{textSubHeader1}</Text>
            <Text style={styles.textSize}>{textSubHeader2}</Text>
          </View>
        </View>
        <Board
          squares={current.squares}
          onPress={this._handleClick}
          winnerLine={winner && winner.lines}
          isDraw={isDraw}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          {stepNumber >= 1 && (
            <View style={{flexDirection: 'row'}}>
              <Button
                onPress={() => this._jumpTo(stepNumber - 1)}
                text="Prev"
              />
              <Button
                onPress={this._onResetPress}
                text={winner | isDraw ? 'Play Again' : 'Reset'}
              />
              <Button
                onPress={() => this._jumpTo(stepNumber + 1)}
                text="Next"
              />
            </View>
          )}
        </View>
      </View>
    );
  }

  _onResetPress = () => {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    });
  };

  _jumpTo = (step: number) => {
    let {history} = this.state;
    if (history.length > step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    }
  };

  _handleClick = (i: number) => {
    let {history, stepNumber, xIsNext} = this.state;
    let sHistory = history.slice(0, stepNumber + 1);
    let current = sHistory[sHistory.length - 1];
    let squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: sHistory.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: sHistory.length,
      xIsNext: !xIsNext,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textSize: {
    fontSize: 20,
  },
  subHeader: {
    marginTop: 20,
    alignItems: 'center',
  },
});
