import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import { BookGenres } from "../config";

const CREATE_BOOK_MUTATION = gql`
  mutation CREATE_BOOK_MUTATION(
    $title: String!
    $author: String!
    $description: String!
    $year: Int!
    $image: String
    $largeImage: String
    $printLength: Int
    $publisher: String
    $pdfURL: String
    $genre1: BookGenre
    $genre2: BookGenre
    $genre3: BookGenre
  ) {
    createBook(
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
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateBook extends Component {
  state = {
    title: "",
    author: "",
    description: "",
    year: null,
    printLength: null,
    publisher: "",
    pdfURL: "",
    genre1: "UNSELECTED",
    genre2: "UNSELECTED",
    genre3: "UNSELECTED",
    image: "",
    largeImage: ""
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

    if (type === "checkbox" && name === "genres") {
      const genres = [];
      var genresSelected = document.querySelectorAll(".bookGenreInput");
      genresSelected.forEach(genre => {
        if (genre.checked) {
          genres.push(genre.defaultValue);
        }
      });
      console.log(genres, "GENRES YO");
      this.setState({ [name]: genres });
    } else {
      this.setState({ [name]: val });
    }
  };

  uploadFile = async e => {
    console.log("uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "culture-club");
    console.log(files, data);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/peterdurham/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_BOOK_MUTATION} variables={this.state}>
        {(createBook, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // Stop the form from submitting
              e.preventDefault();
              console.log(this.state, "STATE");
              // call the mutation
              const res = await createBook();
              // change them to the single item page
              console.log(res, "RESPOSNE");
              Router.push({
                pathname: "/book",
                query: { id: res.data.createBook.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Add Book</h2>
              <label htmlFor="file">
                Image*
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img
                    width="200"
                    src={this.state.image}
                    alt="Upload Preview"
                  />
                )}
              </label>
              <label htmlFor="title">
                Title*
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="author">
                Author*
                <input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="Author"
                  required
                  value={this.state.author}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="year">
                Year*
                <input
                  type="number"
                  id="year"
                  name="year"
                  placeholder="Year"
                  required
                  value={this.state.year}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description*
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter A Description"
                  required
                  value={this.state.description}
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
                  value={this.state.printLength}
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
                  value={this.state.publisher}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="genre1">
                Genre
                <select
                  id="genre1"
                  name="genre1"
                  onChange={this.handleChange}
                  defaultValue="UNSELECTED"
                >
                  {BookGenres.map(genre => {
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
                    defaultValue="UNSELECTED"
                  >
                    {BookGenres.map(genre => {
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
                      defaultValue="UNSELECTED"
                    >
                      {BookGenres.map(genre => {
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
                  value={this.state.pdfURL}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateBook;
export { CREATE_BOOK_MUTATION };
