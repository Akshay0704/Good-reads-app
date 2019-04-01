import React, { Component } from "react";
import AllResults from "./AllResults";
import { connect } from "react-redux";
import { fetchBooks, onSearchText } from "../actions/actionCreator";
import { bindActionCreators } from "redux";


class Search extends Component {
  

  render() {
    return (
      <div>
        <div className="form-group row">
          <input
            className="mr-1 col-sm-9 form-control"
            type="text"
            placeholder="Search Books By title, author, or ISBN..."
            name="searchText"
            onChange={(e) => {this.props.onSearchText(e.target.value)}}
            value={this.props.searchText}
          />
          <button
            className="col-sm-2 btn btn-primary"
            onClick={() => this.props.fetchBooks(this.props.searchText)}
          >
            Search
          </button>
        </div>

        {/**
         * if fetching data, display "loading...", if error, display error message, else display search results
         */}
        { this.props.fetching ? (
          <p className="lead text-center">{"loading... "}</p>
        ) : (
          ((this.props.error !== "") && (
            <p className="text-danger">{this.props.error}</p>
          )) || (
            <AllResults/>
          )
        )}
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchBooks,
      onSearchText
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return { 
    fetching: state.booksReducer.fetching,
    searchText: state.booksReducer.searchText,
    error: state.booksReducer.error
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

