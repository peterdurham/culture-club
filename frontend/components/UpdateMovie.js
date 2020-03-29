import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const SINGLE_MOVIE_QUERY = gql`
  query SINGLE_MOVIE_QUERY($id: ID!) {
    movie(where: { id: $id }) {
      id
      title
      description
      year
    }
  }
`;
const UPDATE_MOVIE_MUTATION = gql`
  mutation UPDATE_MOVIE_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $year: Int
    $length: Int
    $budget: Int
    $gross: Int
    $imdbURL: String
  ) {
    updateMovie(
      id: $id
      title: $title
      description: $description
      year: $year
      length: $length
      budget: $budget
      gross: $gross
      imdbURL: $imdbURL
    ) {
      id
      title
      description
      year
      length
      budget
      gross
      imdbURL
    }
  }
`;

class UpdateMovie extends Component {
  state = {};
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  updateMovie = async (e, updateMovieMutation) => {
    e.preventDefault();
    console.log("Updating Movie!!");
    console.log(this.state);
    const res = await updateMovieMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    console.log("Updated!!");
  };

  render() {
    return (
      <Query
        query={SINGLE_MOVIE_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.movie) return <p>No Movie Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_MOVIE_MUTATION} variables={this.state}>
              {(updateMovie, { loading, error }) => (
                <Form onSubmit={e => this.updateMovie(e, updateMovie)}>
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
                        required
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
