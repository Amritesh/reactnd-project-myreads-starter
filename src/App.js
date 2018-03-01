import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import MyReads from './components/MyReads'
import Search from './components/Search'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    categories: [{
      id: 'currentlyReading',
      name: 'Currently Reading',
      books: []
    },
    {
      id: 'wantToRead',
      name: 'Want to Read',
      books: []
    },
    {
      id: 'read',
      name: 'Read',
      books: []
    }]
  }
  
  updateCategory = (book, newCategory) => {
    const categories = this.state.categories;
    BooksAPI.update(book, newCategory).then((response) => {
      const newCategories = categories.map(category => {
        category.books = category.books.filter((b)=> b.shelf === category.id);
        if(category.id === newCategory) {
          category.books = category.list.concat([book]);
        }
        return category;
      })
      this.setState({categories: newCategories});
    });
  }

  update = (books) => {
    const categories = this.state.categories;
    const newCategories = categories.map(category => {
      const filteredBooks = books.filter((book) => book.shelf === category.id);
      category.books = category.books.concat(filteredBooks);
      return category;
    })
    this.setState({categories: newCategories});
  }

  componentDidMount() {
    BooksAPI.getAll().then((result) => {
      console.log(result);
      this.update(result);
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads updateCategory={this.updateCategory} {...this.state}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search updateCategory={this.updateCategory}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
