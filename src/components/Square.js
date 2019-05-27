import React, { Component } from 'react'

class Square extends Component {
  revealBox = () => {
    this.props.handleLeftClick(this.props.row, this.props.column)
  }

  flagBox = event => {
    event.preventDefault()
    this.props.handleRightClick(this.props.row, this.props.column)
  }
  render() {
    let output = this.props.value
    if (this.props.value === 'F') {
      output = <img src={require('../assets/sunny.jpg')} className="sunny" />
    }
    if (this.props.value === '*') {
      output = <img src={require('../assets/dandy.jpg')} className="sunny" />
    }
    return (
      <td className="tdBox" onClick={this.revealBox} onContextMenu={this.flagBox}>
        {output}
      </td>
    )
  }
}

export default Square
