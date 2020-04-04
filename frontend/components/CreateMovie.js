import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import { MovieGenres } from "../config";

const CREATE_MOVIE_MUTATION = gql`
  mutation CREATE_MOVIE_MUTATION(
    $title: String!
    $director: String
    $year: Int!
    $description: String!
    $length: Int
    $budget: Int
    $gross: Int
    $imdbURL: String
    $genre1: MovieGenre
    $genre2: MovieGenre
    $genre3: MovieGenre
    $image: String
    $largeImage: String
  ) {
    createMovie(
      title: $title
      director: $director
      year: $year
      description: $description
      length: $length
      budget: $budget
      gross: $gross
      imdbURL: $imdbURL
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

class CreateMovie extends Component {
  state = {
    title: "",
    director: "",
    year: null,
    description: "",
    length: null,
    budget: null,
    gross: null,
    imdbURL: "",
    genre1: "UNSELECTED",
    genre2: "UNSELECTED",
    genre3: "UNSELECTED",
    image: "",
    largeImage: "",
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async (e) => {
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
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_MOVIE_MUTATION} variables={this.state}>
        {(createMovie, { loading, error }) => (
          <Form
            onSubmit={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createMovie();
              // change them to the single item page
              console.log(res);
              Router.push({
                pathname: "/movie",
                query: { id: res.data.createMovie.id },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Add Movie</h2>
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

              <label htmlFor="length">
                length (min)
                <input
                  type="number"
                  id="length"
                  name="length"
                  placeholder="Length in minutes"
                  value={this.state.length}
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
                  {MovieGenres.map((genre) => {
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
                    {MovieGenres.map((genre) => {
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
                      {MovieGenres.map((genre) => {
                        return (
                          <option value={genre.value} key={genre.value}>
                            {genre.title}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                )}

              <label htmlFor="imdbURL">
                imdb URL
                <input
                  type="text"
                  id="imdbURL"
                  name="imdbURL"
                  placeholder="imdb URL"
                  value={this.state.imdbURL}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="budget">
                Budget ($)
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  placeholder="Budget"
                  value={this.state.budget}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="gross">
                gross ($)
                <input
                  type="number"
                  id="gross"
                  name="gross"
                  placeholder="gross"
                  value={this.state.gross}
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
