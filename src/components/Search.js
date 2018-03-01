import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from "./Book";

export default class Search extends Component {

    state = {
        query: '',
        books: []
    }
    
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    
        if (query) {
            BooksAPI.search(query, 20).then((result) => {
                console.log(result)
                this.setState({ books: result})
          });
        }
    }
    
    render() {
        const { updateCategory } = this.props;
        const { query, books } = this.state;
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                        value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.length > 0 && books.map((book) => (
                            <Book key={book.id} book={book} updateCategory={updateCategory}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}