import React, { Component } from 'react'
import { request } from 'http'

class App extends Component {
  state = {
    board: []
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
          board: game.board
        })
        console.log(game.board)
      })
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
                        <td key={j} className="tdBox">
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
