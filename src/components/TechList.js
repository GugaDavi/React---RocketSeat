import React, { Component } from 'react'
import { list } from 'postcss';

import TechItem from './TechItem'

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  };

  componentDidMount() {
    const techs = localStorage.getItem('techs')

    if (techs) {
      this.setState({ techs: JSON.parse(techs) })
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value })
  }

  addTech = e => {
    e.preventDefault()

    if (this.state.newTech !== '') {
      this.setState({
        techs: [...this.state.techs, this.state.newTech],
        newTech: '' 
      })
    }

  }

  excludeTech = (tech) => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) })
  }

  render() {
    return (
      <form onSubmit={this.addTech}>
        <h2>{this.state.newTech}</h2>
        <ul>
          {this.state.techs.map((tech, index) => (
            <TechItem 
              key={index} 
              tech={tech}
              onDelete={() => this.excludeTech(tech)}
            />
            ))}
        </ul>
        <input 
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button
          type="submit"
        >
          Adiciar
        </button>
      </form>
    )
  }
}

export default TechList