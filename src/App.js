import React, { Component } from 'react'
import Square from './components/Square'

class App extends Component {
  state = {
    board: [],
    gameId: null
  }
  componentDidMount() {
    const data = { number: 0 }
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('https://minesweeper-api.herokuapp.com/games', request)
      .then(response => {
        return response.json()
      })
      .then(game => {
        this.setState({
          board: game.board,
          gameId: game.id
        })
      })
  }

  clickBox = (row, column) => {
    fetch(`https://minesweeper-api.herokuapp.com/games/${this.state.gameId}/check`, {
      method: 'POST',
      body: JSON.stringify({
        row: row,
        col: column
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(updatedBoard => {
        this.setState({
          board: updatedBoard.board
        })
      })
  }

  flagBox = (row, column) => {
    fetch(`https://minesweeper-api.herokuapp.com/games/${this.state.gameId}/flag`, {
      method: 'POST',
      body: JSON.stringify({
        row: row,
        col: column
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(updatedBoard => {
        console.log('updatedGame', updatedBoard.board)
        this.setState({
          board: updatedBoard.board
        })
      })
  }
  render() {
    return (
      <main>
        <h1 className="mainTitle">Plants vs. Weeds</h1>
        <div>
          <table>
            <tbody>
              {this.state.board.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((value, j) => {
                      return (
                        <Square
                          key={j}
                          value={value}
                          handleLeftClick={this.clickBox}
                          handleRightClick={this.flagBox}
                          row={i}
                          column={j}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    )
  }
}

export default App
