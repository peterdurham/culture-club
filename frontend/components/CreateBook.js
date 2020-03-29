import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

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
    $genres: [String]
    $characters: [String]
    $status: BookStatus
  ) {
    createBook(
      title: $title
      author: $author
      description: $description
      year: $year
      printLength: $printLength
      publisher: $publisher
      pdfURL: $pdfURL
      genres: $genres
      characters: $characters
      status: $status
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
    genres: [],
    characters: [],
    status: "UNSELECTED",
    image: "",
    largeImage: ""
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
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
              // call the mutation
              const res = await createBook();
              // change them to the single item page
              console.log(res);
              Router.push({
                pathname: "/book",
                query: { id: res.data.createBook.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
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
              <label htmlFor="genres">
                Genres (comma separated)
                <input
                  type="text"
                  id="genres"
                  name="genres"
                  placeholder="Genres"
                  value={this.state.genres}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="characters">
                Characters
                <input
                  type="text"
                  id="characters"
                  name="characters"
                  placeholder="Characters"
                  value={this.state.characters}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="status">
                Movie Status: UNSELECTED, SEEN_IT, TO_WATCH
                <input
                  type="text"
                  id="status"
                  name="status"
                  placeholder="status"
                  value={this.state.status}
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
