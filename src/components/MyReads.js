import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Category from "./Category";

export default class MyReads extends Component {
  render() {
    const { categories, updateCategory } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {categories.map((category) => (
            <Category key={category.id} updateCategory={updateCategory} {...category} />
        ))}
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}