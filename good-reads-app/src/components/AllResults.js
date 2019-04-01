import React, { Component } from "react";
import SearchResult from "./SearchResult";
import { connect } from "react-redux";


class AllResults extends Component {

  render() {
    return (
      <div className="row">
        {this.props.books.map(book => (
          <SearchResult bookData={book} key={book.id}  />
        ))}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { books: state.booksReducer.books };
};

export default connect(mapStateToProps)(AllResults);


