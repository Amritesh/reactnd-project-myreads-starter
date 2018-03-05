import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import MyReads from './components/MyReads'
import Search from './components/Search'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    shelves: [{
      id: 'currentlyReading',
      name: 'Currently Reading',
    },
    {
      id: 'wantToRead',
      name: 'Want to Read',
    },
    {
      id: 'read',
      name: 'Read',
    }],
    books: []
  }
  
  updateShelf = (book, newShelf) => {
    const books = this.state.books;
    let scope=this;
    BooksAPI.update(book, newShelf).then(() => {
      if (newShelf === 'none'){
        const books = books.filter(b => b.id !== book.id);
        scope.setState({books: books});
      }
      BooksAPI.getAll().then((result) => {
        scope.setState({books: result});
      });
    });
  }

  componentDidMount() {
    let scope=this;
    BooksAPI.getAll().then((result) => {
      scope.setState({books: result});
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads updateShelf={this.updateShelf} {...this.state}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search updateShelf={this.updateShelf} books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
