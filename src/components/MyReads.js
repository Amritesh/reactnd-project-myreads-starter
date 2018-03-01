import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from "./Shelf";

export default class MyReads extends Component {

  filterShelf = (shelfId) => {
    const { books } = this.props;
    return books.filter(book => book.shelf === shelfId);
  };

  render() {
    const { shelves, updateShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {shelves.map((shelf) => (
            <Shelf key={shelf.id} updateShelf={updateShelf} {...shelf} 
            books={this.filterShelf(shelf.id)}/>
        ))}
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}