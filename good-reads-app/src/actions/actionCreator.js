import { EXPAND_BOOK, COLLAPSE_BOOK , BOOKS_RECEIVED, BOOKS_FETCHING, SEARCH_TEXT, BOOKS_FAILED, DESCRIPTION_RECEIVED, DESCRIPTION_FETCHING, DESCRIPTION_FAILED} from './actionsTypes'
import Axios from "axios"

const apiKey = "p8THuaYBkNwM725o0MZvA"

export const booksReceived = (books) => {
    return {
      type: BOOKS_RECEIVED,
      books
    }
};

export const booksFetching = () => {
  return {
    type: BOOKS_FETCHING
  }
};

export const booksFailed = (error) => {
  return {
    type: BOOKS_FAILED,
    error
  }
};

export const descriptionReceived = (description) => {
  return {
    type: DESCRIPTION_RECEIVED,
    description
  }
};

export const descriptionFetching = () => {
return {
  type: DESCRIPTION_FETCHING
}
};

export const descriptionFailed = (error) => {
return {
  type: DESCRIPTION_FAILED,
  error
}
};

export const expandBook = (bookData) => {
    return {
      type: EXPAND_BOOK,
      bookData
    }
}

export const collapseBook = () => {
  return {
    type: COLLAPSE_BOOK,
    bookData: null
  }
}

export const onSearchText = (searchText) => {
   return {
     type: SEARCH_TEXT,
     searchText
   }
}

export const fetchBooks = (searchText) => {  
  return dispatch => {
    dispatch(booksFetching());
    const requestUri =
      `https://cors-anywhere.herokuapp.com/` +
      `https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${searchText}`;

    return Axios.get(requestUri)
    .then(res => {
      let books = parseXMLResponse(res.data);
      dispatch(booksReceived(books));
    })
    .catch(error => {
      dispatch(booksFailed(error.toString()));
    });
  };
}

export const fetchDescription = (bookId) => {
  // const bookId = this.props.bookData.best_book.id;
  return dispatch => {
    dispatch(descriptionFetching());
    const requestUri =
      `https://cors-anywhere.herokuapp.com/` +
      `https://www.goodreads.com/book/show/${bookId}?key=${apiKey}`;
    Axios.get(requestUri)
    .then(res => {
      const parser = new DOMParser();
      const XMLResponse = parser.parseFromString(res.data, "application/xml");const parseError = XMLResponse.getElementsByTagName("parsererror");

      if (parseError.length) {
        this.setState({
          error: "There was an error fetching results."
        });
      } else {
        let description = XMLResponse.getElementsByTagName("description")[0].innerHTML;

        description = description.replace("<![CDATA[", "").replace("]]>", "");

        if (!description) {
          description = "No description found.";
        }
        dispatch(descriptionReceived(description));
      }
    })
    .catch(error => {
      dispatch(descriptionFailed(error.toString()));
    });
  };
}


// parse string xml received from goodreads api
function parseXMLResponse(response) {
  const parser = new DOMParser();
  const XMLResponse = parser.parseFromString(response, "application/xml");
  const parseError = XMLResponse.getElementsByTagName("parsererror");

  if (parseError.length) {
    this.setState({
      error: "There was an error fetching results.",
      fetchingData: false
    });
  } else {
    const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
    const searchResults = XMLresults.map(result => XMLToJson(result));
    // this.setState({ fetchingData: false }, () => {
    //   this.props.setResults(searchResults);
    // });
    // console.log(searchResults);
    return searchResults;
    
  }
}

// Function to convert simple XML document into JSON.
// Loops through each child and saves it as key, value pair
// if there are sub-children, call the same function recursively on its children.
function XMLToJson(XML) {
  const allNodes = new Array(...XML.children);
  const jsonResult = {};
  allNodes.forEach(node => {
    if (node.children.length) {
      jsonResult[node.nodeName] = XMLToJson(node);
    } else {
      jsonResult[node.nodeName] = node.innerHTML;
    }
  });
  return jsonResult;
}