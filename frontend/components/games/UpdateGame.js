import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "../styles/Form";
import formatMoney from "../../lib/formatMoney";
import Error from "../ErrorMessage";
import { GameGenres, GamePlatforms } from "../../config";

const SINGLE_GAME_QUERY = gql`
  query SINGLE_GAME_QUERY($id: ID!) {
    game(where: { id: $id }) {
      id
      title
      developer
      description
      year
      numPlayers
      websiteURL
      platform1
      platform2
      platform3
      genre1
      genre2
      genre3
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
    $numPlayers: NumPlayers
    $websiteURL: String
    $platform1: GamePlatform
    $platform2: GamePlatform
    $platform3: GamePlatform
    $genre1: GameGenre
    $genre2: GameGenre
    $genre3: GameGenre
  ) {
    updateGame(
      id: $id
      title: $title
      developer: $developer
      description: $description
      year: $year
      numPlayers: $numPlayers
      websiteURL: $websiteURL
      platform1: $platform1
      platform2: $platform2
      platform3: $platform3
      genre1: $genre1
      genre2: $genre2
      genre3: $genre3
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
  handleChange = (e) => {
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
        ...this.state,
      },
    });
    console.log("Updated!!");
  };

  render() {
    return (
      <Query
        query={SINGLE_GAME_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.game) return <p>No Game Found for ID {this.props.id}</p>;

          return (
            <Mutation mutation={UPDATE_GAME_MUTATION} variables={this.state}>
              {(updateGame, { loading, error }) => (
                <Form onSubmit={(e) => this.updateGame(e, updateGame)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
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
                        defaultValue={data.game.year}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        style={{ height: "100px" }}
                        defaultValue={data.game.description}
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
                        defaultValue={data.game.developer}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="numPlayers">
                      Number of Players
                      <select
                        id="numPlayers"
                        name="numPlayers"
                        onChange={this.handleChange}
                        defaultValue={data.game.numPlayers}
                      >
                        <option value="UNSELECTED">
                          Select Number of Players
                        </option>
                        <option value="SINGLE_PLAYER_OFFLINE">
                          Single Player (offline)
                        </option>
                        <option value="MULTI_PLAYER_OFFLINE">
                          Multiplayer (offline)
                        </option>
                        <option value="SINGLE_PLAYER_ONLINE">
                          Single Player (online)
                        </option>
                        <option value="MULTI_PLAYER_ONLINE">
                          Multiplayer (online)
                        </option>
                      </select>
                    </label>

                    <label htmlFor="platform1">
                      Platforms
                      <select
                        id="platform1"
                        name="platform1"
                        onChange={this.handleChange}
                        defaultValue={data.game.platform1}
                      >
                        {GamePlatforms.map((platform) => {
                          return (
                            <option value={platform.value} key={platform.value}>
                              {platform.title}
                            </option>
                          );
                        })}
                      </select>
                    </label>
                    {data.game.platform1 !== "UNSELECTED" && (
                      <label htmlFor="platform2">
                        Platform 2
                        <select
                          id="platform2"
                          name="platform2"
                          onChange={this.handleChange}
                          defaultValue={data.game.platform2}
                        >
                          {GamePlatforms.map((platform) => {
                            return (
                              <option
                                value={platform.value}
                                key={platform.value}
                              >
                                {platform.title}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    )}
                    {data.game.platform2 !== "UNSELECTED" &&
                      data.game.platform1 !== "UNSELECTED" && (
                        <label htmlFor="platform3">
                          Platform 3
                          <select
                            id="platform3"
                            name="platform3"
                            onChange={this.handleChange}
                            defaultValue={data.game.platform3}
                          >
                            {GamePlatforms.map((platform) => {
                              return (
                                <option
                                  value={platform.value}
                                  key={platform.value}
                                >
                                  {platform.title}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                      )}

                    <label htmlFor="genre1">
                      Genre
                      <select
                        id="genre1"
                        name="genre1"
                        onChange={this.handleChange}
                        defaultValue={data.game.genre1}
                      >
                        {GameGenres.map((genre) => {
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
                          defaultValue={data.game.genre2}
                        >
                          {GameGenres.map((genre) => {
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
                            defaultValue={data.game.genre3}
                          >
                            {GameGenres.map((genre) => {
                              return (
                                <option value={genre.value} key={genre.value}>
                                  {genre.title}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                      )}
                    <label htmlFor="websiteURL">
                      Website URL
                      <input
                        type="text"
                        id="websiteURL"
                        name="websiteURL"
                        placeholder="Website URL"
                        defaultValue={data.game.websiteURL}
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
