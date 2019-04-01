import React, { Component } from 'react'
import Search from "./components/Search";
import BookInfo from "./components/BookInfo";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types'


class App extends Component {

  static contextTypes = {
    router: PropTypes.object
  }


  render() {
    return (
      <div className="container">
        <div className="header clearfix mt-5">
          <h3 className="text-muted">Goodreads Book Search</h3>
        </div>
        <div className="jumbotron">
          {/* <Router>
          {
            this.props.selectedBookData ? (this.context.router.history.push("/about")) : (this.context.router.history.push("/"))
          }
            <Switch>
              <Route exact path='/' component={Search}></Route>
              <Route exact path='/about' component={BookInfo}></Route>
            </Switch>
          </Router> */}
          {
            this.props.selectedBookData ? (<BookInfo/>) : (<Search/>)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedBookData: state.booksReducer.selectedBookData };
};

export default connect(mapStateToProps)(App);

