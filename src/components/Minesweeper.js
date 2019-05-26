import React, { Component } from 'react'

class Minesweeper extends Component {
  constructor(props) {
    super(props)
    state = {    
        board: []
    }
  }

  componentDidMount() {
    // const difficulty={number: 0}
    fetch('https://minesweeper-api.herokuapp.com/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ difficulty: 0 })
    })
      .then(response => {
        return response.json()
      })
      .then(newGame => {
        console.log(newGame)
        this.setState({
          game: newGame
        })
      })
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.board.map((row, i) => {
              return 
                <tr key={i}>
                {row.map((row,i) => {
                  return <td key={j} className="tdSquare">
                  {column.map((column, j) => {

                  }
                  }
                    {this.state.board[i][j]}
                  </td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Minesweeper
