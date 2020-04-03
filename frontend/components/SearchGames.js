import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_GAMES_QUERY = gql`
  query SEARCH_GAMES_QUERY($searchTerm: String!) {
    games(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;
function routeToGame(game) {
  Router.push({
    pathname: "/game",
    query: {
      id: game.id
    }
  });
}
class AutoCompleteGames extends React.Component {
  state = {
    games: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    console.log("searching");
    console.log(client);
    // turn loading on
    this.setState({ loading: true });
    // manually query apollo client
    const res = await client.query({
      query: SEARCH_GAMES_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      games: res.data.games,
      loading: false
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToGame}
          itemToString={game => (game === null ? "" : game.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "search for an game",
                      id: "search",
                      // className: this.state.loading,
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.games.map((game, index) => (
                    <DropDownItem
                      {...getItemProps({ item: game })}
                      key={game.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={game.image} alt={game.title} />
                      {game.title}
                    </DropDownItem>
                  ))}
                  {!this.state.games.length && !this.state.loading && (
                    <DropDownItem>Nothing Found for {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}
export default AutoCompleteGames;
