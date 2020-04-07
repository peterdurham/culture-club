import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "../styles/Form";
import formatMoney from "../../lib/formatMoney";
import Error from "../ErrorMessage";
import { MovieGenres } from "../../config";

const SINGLE_MOVIE_QUERY = gql`
  query SINGLE_MOVIE_QUERY($id: ID!) {
    movie(where: { id: $id }) {
      id
      title
      year
      director
      description
      length
      budget
      gross
      imdbURL
      genre1
      genre2
      genre3
    }
  }
`;
const UPDATE_MOVIE_MUTATION = gql`
  mutation UPDATE_MOVIE_MUTATION(
    $id: ID!
    $title: String
    $year: Int
    $director: String
    $description: String
    $length: Int
    $budget: Int
    $gross: Int
    $imdbURL: String
    $genre1: MovieGenre
    $genre2: MovieGenre
    $genre3: MovieGenre
  ) {
    updateMovie(
      id: $id
      title: $title
      year: $year
      director: $director
      description: $description
      length: $length
      budget: $budget
      gross: $gross
      imdbURL: $imdbURL
      genre1: $genre1
      genre2: $genre2
      genre3: $genre3
    ) {
      id
      title
      director
      description
      year
      length
      budget
      gross
      imdbURL
      genre1
      genre2
      genre3
    }
  }
`;

class UpdateMovie extends Component {
  state = {};
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  updateMovie = async (e, updateMovieMutation) => {
    e.preventDefault();

    const res = await updateMovieMutation({
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
        query={SINGLE_MOVIE_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.movie) return <p>No Movie Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_MOVIE_MUTATION} variables={this.state}>
              {(updateMovie, { loading, error }) => (
                <Form onSubmit={(e) => this.updateMovie(e, updateMovie)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.movie.title}
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
                        required
                        defaultValue={data.movie.year}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        defaultValue={data.movie.description}
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
                        defaultValue={data.movie.director}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="genre1">
                      Genre
                      <select
                        id="genre1"
                        name="genre1"
                        onChange={this.handleChange}
                        defaultValue={data.movie.genre1}
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
                          defaultValue={data.movie.genre2}
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
                            defaultValue={data.movie.genre3}
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

                    <label htmlFor="length">
                      Length (minutes)
                      <input
                        type="number"
                        id="length"
                        name="length"
                        placeholder="Enter A movie length in minutes"
                        defaultValue={data.movie.length}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="imdbURL">
                      IMDB Link
                      <textarea
                        id="imdbURL"
                        name="imdbURL"
                        placeholder="IMDB URL"
                        defaultValue={data.movie.imdbURL}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="budget">
                      Budget
                      <textarea
                        id="budget"
                        name="budget"
                        placeholder="Budget"
                        defaultValue={data.movie.budget}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="gross">
                      Gross
                      <textarea
                        id="gross"
                        name="gross"
                        placeholder="Gross"
                        defaultValue={data.movie.gross}
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

export default UpdateMovie;
export { UPDATE_MOVIE_MUTATION };
