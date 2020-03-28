import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const SINGLE_GAME_QUERY = gql`
  query SINGLE_GAME_QUERY($id: ID!) {
    game(where: { id: $id }) {
      id
      title
      developer
      description
      year
    }
  }
`;
const UPDATE_GAME_MUTATION = gql`
  mutation UPDATE_GAME_MUTATION(
    $id: ID!
    $title: String
    $developer: String
    $description: String
    $year: Int
  ) {
    updateGame(
      id: $id
      title: $title
      developer: $developer
      description: $description
      year: $year
    ) {
      id
      title
      developer
      description
      year
    }
  }
`;

class UpdateGame extends Component {
  state = {};
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  updateGame = async (e, updateGameMutation) => {
    e.preventDefault();
    console.log("Updating Game!!");
    console.log(this.state);
    const res = await updateGameMutation({
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
        query={SINGLE_GAME_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.game) return <p>No Game Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_GAME_MUTATION} variables={this.state}>
              {(updateGame, { loading, error }) => (
                <Form onSubmit={e => this.updateGame(e, updateGame)}>
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
                        defaultValue={data.game.title}
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
                        defaultValue={data.game.year}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="developer">
                      Developer
                      <input
                        type="text"
                        id="developer"
                        name="developer"
                        placeholder="Developer"
                        required
                        defaultValue={data.game.developer}
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
                        defaultValue={data.game.description}
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

export default UpdateGame;
export { UPDATE_GAME_MUTATION };
