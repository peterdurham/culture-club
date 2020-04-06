import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "../styles/Form";
import formatMoney from "../../lib/formatMoney";
import Error from "../ErrorMessage";
import { GameGenres, GamePlatforms } from "../../config";

const CREATE_GAME_MUTATION = gql`
  mutation CREATE_GAME_MUTATION(
    $title: String!
    $developer: String!
    $description: String
    $year: Int!
    $numPlayers: NumPlayers
    $websiteURL: String
    $platform1: GamePlatform!
    $platform2: GamePlatform
    $platform3: GamePlatform
    $genre1: GameGenre!
    $genre2: GameGenre
    $genre3: GameGenre
    $image: String
    $largeImage: String
  ) {
    createGame(
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
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateGame extends Component {
  state = {
    title: "",
    developer: "",
    description: "",
    year: null,
    numPlayers: null,
    websiteURL: "",
    platform1: "UNSELECTED",
    platform2: "UNSELECTED",
    platform3: "UNSELECTED",
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
      <Mutation mutation={CREATE_GAME_MUTATION} variables={this.state}>
        {(createGame, { loading, error }) => (
          <Form
            onSubmit={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createGame();
              // change them to the single item page
              console.log(res);
              Router.push({
                pathname: "/game",
                query: { id: res.data.createGame.id },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Add Game</h2>
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
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter A Description"
                  style={{ height: "100px" }}
                  value={this.state.description}
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
                  value={this.state.developer}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="numPlayers">
                Number of Players
                <select
                  id="numPlayers"
                  name="numPlayers"
                  onChange={this.handleChange}
                  defaultValue="UNSELECTED"
                >
                  <option value="UNSELECTED">Select Number of Players</option>
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
                Platform*
                <select
                  id="platform1"
                  name="platform1"
                  onChange={this.handleChange}
                  defaultValue="UNSELECTED"
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
              {this.state.platform1 !== "UNSELECTED" && (
                <label htmlFor="platform2">
                  Platform 2
                  <select
                    id="platform2"
                    name="platform2"
                    onChange={this.handleChange}
                    defaultValue="UNSELECTED"
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
              )}
              {this.state.platform2 !== "UNSELECTED" &&
                this.state.platform1 !== "UNSELECTED" && (
                  <label htmlFor="platform2">
                    Platform 3
                    <select
                      id="platform2"
                      name="platform2"
                      onChange={this.handleChange}
                      defaultValue="UNSELECTED"
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
                )}

              <label htmlFor="genre1">
                Genre*
                <select
                  id="genre1"
                  name="genre1"
                  onChange={this.handleChange}
                  defaultValue="UNSELECTED"
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
                    defaultValue="UNSELECTED"
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
                      defaultValue="UNSELECTED"
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
                  value={this.state.websiteURL}
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

export default CreateGame;
export { CREATE_GAME_MUTATION };
