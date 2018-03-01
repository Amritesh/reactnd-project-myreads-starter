import React, { Component } from 'react'
import Book from "./Book";

export default class Shelf extends Component {

  render() {
    const { name, books, updateShelf } = this.props
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book
                            book={book}
                            updateShelf={updateShelf}
                        />
                    </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}