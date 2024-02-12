/* eslint-disable react/prop-types */
import "./SearchForm.css";

const SearchForm = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    props.onFormSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="google-title">
        <span className="letter-G1">G</span>
        <span className="letter-O1">o</span>
        <span className="letter-O2">o</span>
        <span className="letter-G2">g</span>
        <span className="letter-L">l</span>
        <span className="letter-E">e</span>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search"
        onChange={(e) => props.onSearchValueChange(e.target.value)}
      />

      <div className="form-select">
        <span className="jokes-length">Search Jokes length</span>
        <select
          className="select-input"
          onChange={(e) => props.onJokeAmountChange(e.target.value)}
        >
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className="form-btns">
        <button disabled={props.isSearching}>Search</button>
        <button
          onClick={props.onSingleSearchClick}
          disabled={props.isSearching}
        >
          I&apos;m Feeling Funny
        </button>
        {props.showClearButton && (
          <button onClick={props.onClearResultsClick}>Clear Results</button>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
