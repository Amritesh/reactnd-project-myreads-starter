import React, { Component } from 'react'
import Book from "./Book";

export default class Category extends Component {

  render() {
    const { name, books, updateCategory } = this.props
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
                            updateCategory={updateCategory}
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