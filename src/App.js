import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import MyReads from "./components/MyReads";
import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shelves: [{
                id: "currentlyReading",
                name: "Currently Reading",
            },
            {
                id: "wantToRead",
                name: "Want to Read",
            },
            {
                id: "read",
                name: "Read",
            }],
            books: []
        };
        this.updateShelf = (book, newShelf) => {
            const books = this.state.books;
            book.shelf = newShelf;
            BooksAPI.update(book, newShelf).then(() => {
                if (newShelf === "none"){
                    const nbooks = books.filter(b => b.id !== book.id);
                    this.setState({books: nbooks});
                }else{
                    this.setState({books: books});
                }
            });
        };
    }

    componentDidMount() {
        BooksAPI.getAll().then((result) => {
            this.setState({books: result});
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
        );
    }
}

export default BooksApp;
