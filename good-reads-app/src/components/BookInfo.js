import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { collapseBook, fetchDescription } from '../actions/actionCreator';

class BookInfo extends Component {


  componentDidMount() {
    const bookId = this.props.bookData.best_book.id;
    this.props.fetchDescription(bookId);
  }

  render() {
    const { bookData } = this.props;
    return (
      <div className="row col-lg-12">
        <button className="btn btn-primary" onClick={() => this.props.collapseBook()}>
          {"<< Go Back"}
        </button>

        <h3 className="col-lg-12 mb-3 mt-3">{bookData.best_book.title}</h3>
        <div className="col-lg-2 col-sm-4 ">
          <img
            src={bookData.best_book.image_url}
            height="200px"
            width="130px"
            alt="book cover"
          />
          <p>
            By:{" "}
            <span className="font-weight-bold">
              {bookData.best_book.author.name}
            </span>
          </p>
          <p>Avg. Rating: {bookData.average_rating}</p>
        </div>
        <div className="col-lg-10 col-sm-8">
          {(this.props.error && (
            <p className="text-danger">{this.state.error}</p>
          )) || (
            <p dangerouslySetInnerHTML={{ __html: this.props.description }} />
          )}
        </div>
        <div>
          <p>
            Published Date:{" "}
            {`${bookData.original_publication_day}/${
              bookData.original_publication_month
            }/${bookData.original_publication_year}`}
            .{" "}
            <a
              href={`https://www.goodreads.com/book/show/${
                bookData.best_book.id
              }`}
            >
              Learn More
            </a>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    bookData: state.booksReducer.selectedBookData,
    description: state.booksReducer.description
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      collapseBook,
      fetchDescription
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookInfo);
