import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_MOVIES_QUERY = gql`
  query SEARCH_MOVIES_QUERY($searchTerm: String!) {
    movies(
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
function routeToMovie(movie) {
  Router.push({
    pathname: "/movie",
    query: {
      id: movie.id
    }
  });
}
class AutoComplete extends React.Component {
  state = {
    movies: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    console.log("searching");
    console.log(client);
    // turn loading on
    this.setState({ loading: true });
    // manually query apollo client
    const res = await client.query({
      query: SEARCH_MOVIES_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      movies: res.data.movies,
      loading: false
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToMovie}
          itemToString={movie => (movie === null ? "" : movie.title)}
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
                      placeholder: "search for an movie",
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
                  {this.state.movies.map((movie, index) => (
                    <DropDownItem
                      {...getItemProps({ item: movie })}
                      key={movie.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={movie.image} alt={movie.title} />
                      {movie.title}
                    </DropDownItem>
                  ))}
                  {!this.state.movies.length && !this.state.loading && (
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
export default AutoComplete;
