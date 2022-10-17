import React from 'react';

import './styles.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
    console.log('constructor');
  }
  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => console.log(this.state)
        )
      );
  }

  onSearchChange = (event) => {
    let searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    console.log('render');
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div>
        <h1>Monsters Rolodex</h1>
        <input
          className="search-box"
          placeholder="Search Monsters"
          type="search"
          onChange={onSearchChange}
        />
        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}
