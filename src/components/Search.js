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
        this.setState({ query: query })
        let scope = this;
        if (query) {
            BooksAPI.search(query, 20).then((result) => {
                if(!result.error)
                    scope.setState({books: result, searchErr: false});
                else
                    scope.setState({books: [], searchErr: true});
          });
        } else{
            scope.setState({books: [], searchErr: false});
        }
    }
    
    render() {
        const { updateShelf } = this.props;
        const { query, books, searchError } = this.state;
        
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
                            <Book key={book.id} book={book} updateShelf={updateShelf}/>
                        ))}
                    </ol>
                </div>
                {searchErr && query && (
                    <div>
                        <div>
                            <h3>No result found. Please try again!</h3>
                        </div>
                    </div>
                )}
                {!query && (
                    <div>
                        <h3>Enter query to search.</h3>
                    </div>
                )}
            </div>
        )
    }
}