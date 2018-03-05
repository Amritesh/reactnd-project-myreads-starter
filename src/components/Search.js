import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            list: []
        };
        let scope = this;
        this.updateQuery = (query) => {
            scope.setState({ query: query });
    
            if (query) {
                BooksAPI.search(query, 20).then((result) => {
                    if(!result.error){
                        const { books } = this.props;
                        const list = result.map((book) => {
                            var found = books.find(b => b.id === book.id);
                            if(found)
                                book.shelf = found.shelf;
                            else
                                book.shelf = "none";
                            return book;
                        });
                        scope.setState({ list: list, searchError: false});
                    }
                    else
                        scope.setState({ list: [], searchError: true});
                });
            } else{
                scope.setState({ list: [], searchError: false});
            }
        };
    }
    render() {
        const { updateShelf } = this.props;
        const { query, list, searchError } = this.state;
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                {query && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {list.length > 0 && list.map((book) => (
                                <Book key={book.id} book={book} updateShelf={updateShelf}/>
                            ))}
                        </ol>
                    </div>
                    )}
                {searchError && (
                    <div>
                        <div>
                            <h3>No result found. Please try again!</h3>
                        </div>
                    </div>
                )}
                {!query && (
                    <div className="search-books-results">
                        <h3>Enter query to search.</h3>
                    </div>
                )}
            </div>
        );
    }
}