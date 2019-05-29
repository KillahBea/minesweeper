import React, { Component } from 'react'
import Square from './components/Square'

import grass from './assets/grass.png'

class App extends Component {
  state = {
    board: [],
    gameId: null,
    status: [],
    difficulty: 0
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
  setDifficulty = event => {
    this.setState(
      {
        difficulty: +event.target.value
      },
      () => {
        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        }
      }
    )
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
        let message = ''
        if (updatedBoard.state === 'lost') {
          message = 'Plants Lose'
        } else if (updatedBoard.state === 'won') {
          message = 'Plants Win'
        }
        this.setState({
          board: updatedBoard.board,
          message
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
        <section>
          <p className="difficulty">Choose your difficulty:</p>
          <select>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard...That's what she said.</option>
          </select>
        </section>
        <h1 className="message">{this.state.message}</h1>
        <h1 className="header">Plants vs. Weeds</h1>
        <div className="grassy-grass">
          <img src={grass} alt="green grass" className="green-grass" />
          <img src={grass} alt="green grass" className="green-grass2" />
          <img src={grass} alt="green grass" className="green-grass3" />
        </div>
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
