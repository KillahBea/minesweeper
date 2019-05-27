import React, { Component } from 'react'

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
        console.log(game)
        this.setState({
          board: game.board,
          gameId: game.id
        })
      })
  }

  clickBox = (row, column) => {
    console.log('clicked', row, column, this.state.gameId)
    fetch(`https://minesweeper-api.herokuapp.com/games/${this.state.gameId}/check`, {
      method: 'POST',
      body: JSON.stringify({
        row: row,
        column: column
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(updatedBoard => {
        console.log('updatedGame')
        this.setState({
          board: updatedBoard.board
        })
      })
  }
  flagBox = (ros, column) => {
    console.log('flagged', row, column)
  }
  render() {
    return (
      <main>
        <h1 className="mainTitle">Crazy Mine</h1>
        <div>
          <table>
            <tbody>
              {this.state.board.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((column, j) => {
                      return (
                        <td
                          key={j}
                          className="tdBox"
                          onClick={() => this.clickBox(i, j)}
                          onContextMenu={() => this.flagBox(i, j)}
                        >
                          {this.state.board[i][j]}
                        </td>
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
