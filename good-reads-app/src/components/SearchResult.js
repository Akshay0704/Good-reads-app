import React, { Component }  from "react";
import { expandBook } from "../actions/actionCreator";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";



class SearchResult extends Component {

  render () {
    /**
     * truncate book title to first 4 words and append it with '...'
     * indicating it is truncated.
     * Full title will be shown in a tooltip
     */
    const bookTitle = this.props.bookData.best_book.title;
    let displayTitle = bookTitle
      .split(" ")
      .slice(0, 4)
      .join(" ");
    if (bookTitle.length > displayTitle.length) {
      displayTitle += "...";
    }

    return (
      (this.props.bookData && 
      <div className="col-lg-2 col-sm-4 col-md-3">
        <div className="card">
          <img
            className="card-img-top pl-2 pr-2 pt-2"
            src={this.props.bookData.best_book.image_url}
            alt="Book cover"
            height="200px"
          />
          <div className="card-body">
            <p
              className="text-sm-left card-title font-weight-bold"
              data-toggle="tooltip"
              data-placement="bottom"
              title={displayTitle.includes("...") ? bookTitle : ""}
            >
              {displayTitle}
            </p>
            <p className="text-sm-left card-text">
              {this.props.bookData.best_book.author.name}
            </p>

            <button
              className="btn btn-primary"
              onClick={() => this.props.expandBook(this.props.bookData)}
            >
              More Info
            </button>
          </div>
        </div>
      </div>)
      
    );
  }
  
}



const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      expandBook
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(SearchResult);

