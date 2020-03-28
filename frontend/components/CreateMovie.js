import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const CREATE_MOVIE_MUTATION = gql`
  mutation CREATE_MOVIE_MUTATION(
    $title: String!
    $year: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createMovie(
      title: $title
      year: $year
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateMovie extends Component {
  state = {
    title: "",
    director: "",
    year: null,
    description: "",
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
      <Mutation mutation={CREATE_MOVIE_MUTATION} variables={this.state}>
        {(createMovie, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createMovie();
              // change them to the single item page
              console.log(res);
              Router.push({
                pathname: "/movie",
                query: { id: res.data.createMovie.id }
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

              <label htmlFor="director">
                Director
                <input
                  type="text"
                  id="director"
                  name="director"
                  placeholder="Director"
                  required
                  value={this.state.director}
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
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateMovie;
export { CREATE_MOVIE_MUTATION };
