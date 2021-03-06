import React, { Component } from "react";

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.onChange = function(book, newValue) {
            const { updateShelf } = this.props;
            updateShelf(book,newValue);
        };
    }
    
    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event) => this.onChange(book,event.target.value)}>
                            <option value="moving" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
            </div>
        );
    }
}