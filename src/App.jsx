import React from "react";
import SearchForm from "./components/SearchForm";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: "",
      jokes: [],
      isFetchingJokes: false,
      searchButtonClicked: false, // Flag to track if search button is clicked
      jokeAmount: 20, // Default joke amount
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this);
    this.handleJokeAmountChange = this.handleJokeAmountChange.bind(this);
  }

  searchJokes() {
    const { searchTerm, jokeAmount } = this.state;
    this.setState({ isFetchingJokes: true });
    fetch(
      `https://icanhazdadjoke.com/search?term=${searchTerm}&limit=${jokeAmount}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        const jokes = json.results;
        this.setState({
          jokes,
          isFetchingJokes: false,
        });
      });
  }

  onSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  handleSearchButtonClick() {
    this.setState({ searchButtonClicked: true });
    this.searchJokes();
  }

  clearSearchResults() {
    this.setState({
      searchTerm: "",
      jokes: [],
      searchButtonClicked: false,
    });
  }

  handleJokeAmountChange(amount) {
    this.setState({ jokeAmount: amount });
  }

  renderJokes() {
    const { jokes, searchButtonClicked } = this.state;
    if (searchButtonClicked && jokes.length === 0) {
      return <p>Sorry, no joke found</p>;
    }
    return (
      <ul className="search-list">
        {jokes.map((item) => (
          <li key={item.id}>{item.joke}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <>
        <SearchForm
          onFormSubmit={this.handleSearchButtonClick}
          onSearchValueChange={this.onSearchChange}
          isSearching={this.state.isFetchingJokes}
          onSingleSearchClick={() => this.searchJokes(1)}
          showClearButton={
            this.state.searchButtonClicked && this.state.jokes.length > 0
          }
          onClearResultsClick={this.clearSearchResults}
          onJokeAmountChange={this.handleJokeAmountChange}
        />

        <div className="search-state">
          {this.state.isFetchingJokes
            ? "searching for jokes..."
            : this.renderJokes()}
        </div>
      </>
    );
  }
}

export default App;
