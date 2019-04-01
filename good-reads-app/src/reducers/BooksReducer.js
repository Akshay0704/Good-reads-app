import {
  BOOKS_FETCHING ,EXPAND_BOOK, COLLAPSE_BOOK, BOOKS_RECEIVED, SEARCH_TEXT, BOOKS_FAILED, DESCRIPTION_RECEIVED, DESCRIPTION_FETCHING, DESCRIPTION_FAILED
  } from "../actions/actionsTypes";

  const INITIAL_STATE = {
    books: [],
    selectedBookData: null,
    fetching: false,
    searchText: "",
    error: "",
    description: "Fetching description for this book..."
  }
  
  const booksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case BOOKS_FETCHING:
        return {
          ...state, ...{ 
            fetching: true
          }
        };
      case BOOKS_RECEIVED:
        return {
          ...state, ...{ 
            books: action.books,
            fetching: false
          }
        };
      case BOOKS_FAILED:
        return {
          ...state, ...{ 
            fetching: false,
            error: action.error
          }
        };
      case DESCRIPTION_FETCHING:
        return {
          ...state, ...{ 
            description: "Fetching description for this book...",
            fetching: true
          }
        };
      case DESCRIPTION_RECEIVED:
        return {
          ...state, ...{ 
            description: action.description,
            fetching: false
          }
        };
      case DESCRIPTION_FAILED:
        return {
          ...state, ...{ 
            fetching: false,
            error: action.error
          }
        };
      case EXPAND_BOOK:
        return {
          ...state, ...{
            selectedBookData: action.bookData
          }
        };
      case COLLAPSE_BOOK:
        return {
          ...state, ...{
            selectedBookData: null
          }
        };
      case SEARCH_TEXT: 
        return {
          ...state, ...{
            searchText: action.searchText
          }
        };
      default:
        return state;
    }
  };
  
  export default booksReducer;
  