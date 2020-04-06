import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "../styles/Form";
import formatMoney from "../../lib/formatMoney";
import Error from "../ErrorMessage";
import { BookGenres } from "../../config";

const SINGLE_BOOK_QUERY = gql`
  query SINGLE_BOOK_QUERY($id: ID!) {
    book(where: { id: $id }) {
      id
      title
      author
      description
      year
      printLength
      publisher
      pdfURL
      genre1
      genre2
      genre3
    }
  }
`;
const UPDATE_BOOK_MUTATION = gql`
  mutation UPDATE_BOOK_MUTATION(
    $id: ID!
    $title: String
    $author: String
    $description: String
    $year: Int
    $printLength: Int
    $publisher: String
    $pdfURL: String
    $genre1: BookGenre
    $genre2: BookGenre
    $genre3: BookGenre
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      description: $description
      year: $year
      printLength: $printLength
      publisher: $publisher
      pdfURL: $pdfURL
      genre1: $genre1
      genre2: $genre2
      genre3: $genre3
    ) {
      id
      title
      author
      description
      year
      printLength
      publisher
      pdfURL
      genre1
      genre2
      genre3
    }
  }
`;

class UpdateBook extends Component {
  state = {};
  handleChange = (e) => {
    const { name, type, value } = e.target;
    let val = type === "number" ? parseFloat(value) : value;

    if (type === "checkbox" && name === "genres") {
      const genres = [];
      var genresSelected = document.querySelectorAll(".bookGenreInput");
      genresSelected.forEach((genre) => {
        if (genre.checked) {
          genres.push(genre.defaultValue);
        }
      });
      console.log(genres, "GENRES YO");
      this.setState({ [name]: genres });
    } else {
      this.setState({ [name]: val });
    }

    // val = e.target.name === "genres" ? val.split(", ") : val;
    // val = e.target.name === "characters" ? val.split(", ") : val;
    // console.log(val);
  };
  updateBook = async (e, updateBookMutation) => {
    e.preventDefault();
    console.log("Updating Book!!");
    console.log(this.state);
    const res = await updateBookMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    console.log("Updated!!");
  };

  render() {
    return (
      <Query
        query={SINGLE_BOOK_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.book) return <p>No Book Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_BOOK_MUTATION} variables={this.state}>
              {(updateBook, { loading, error }) => (
                <Form onSubmit={(e) => this.updateBook(e, updateBook)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        defaultValue={data.book.title}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="author">
                      Author
                      <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Author"
                        defaultValue={data.book.author}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="year">
                      Year
                      <input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Year"
                        defaultValue={data.book.year}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        defaultValue={data.book.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="printLength">
                      Print Length (pages)
                      <input
                        type="number"
                        id="printLength"
                        name="printLength"
                        placeholder="Number of Pages"
                        defaultValue={data.book.printLength}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="publisher">
                      Publisher
                      <input
                        type="text"
                        id="publisher"
                        name="publisher"
                        placeholder="Publisher"
                        defaultValue={data.book.publisher}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="genre1">
                      Genre
                      <select
                        id="genre1"
                        name="genre1"
                        onChange={this.handleChange}
                        defaultValue={data.book.genre1}
                      >
                        {BookGenres.map((genre) => {
                          return (
                            <option value={genre.value} key={genre.value}>
                              {genre.title}
                            </option>
                          );
                        })}
                      </select>
                    </label>
                    {this.state.genre1 !== "UNSELECTED" && (
                      <label htmlFor="genre2">
                        Genre 2
                        <select
                          id="genre2"
                          name="genre2"
                          onChange={this.handleChange}
                          defaultValue={data.book.genre2}
                        >
                          {BookGenres.map((genre) => {
                            return (
                              <option value={genre.value} key={genre.value}>
                                {genre.title}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    )}
                    {this.state.genre2 !== "UNSELECTED" &&
                      this.state.genre1 !== "UNSELECTED" && (
                        <label htmlFor="genre3">
                          Genre 3
                          <select
                            id="genre3"
                            name="genre3"
                            onChange={this.handleChange}
                            defaultValue={data.book.genre3}
                          >
                            {BookGenres.map((genre) => {
                              return (
                                <option value={genre.value} key={genre.value}>
                                  {genre.title}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                      )}

                    <label htmlFor="pdfURL">
                      Link to PDF
                      <input
                        type="text"
                        id="pdfURL"
                        name="pdfURL"
                        placeholder="PDF Link"
                        defaultValue={data.book.pdfURL}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Sav{loading ? "ing" : "e"} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateBook;
export { UPDATE_BOOK_MUTATION };
