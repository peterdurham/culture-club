import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_BOOKS_QUERY = gql`
  query SEARCH_BOOKS_QUERY($searchTerm: String!) {
    books(
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
function routeToBook(book) {
  Router.push({
    pathname: "/book",
    query: {
      id: book.id
    }
  });
}
class AutoCompleteBooks extends React.Component {
  state = {
    books: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    console.log("searching");
    console.log(client);
    // turn loading on
    this.setState({ loading: true });
    // manually query apollo client
    const res = await client.query({
      query: SEARCH_BOOKS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      books: res.data.books,
      loading: false
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToBook}
          itemToString={book => (book === null ? "" : book.title)}
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
                      placeholder: "search for an book",
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
                  {this.state.books.map((book, index) => (
                    <DropDownItem
                      {...getItemProps({ item: book })}
                      key={book.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={book.image} alt={book.title} />
                      {book.title}
                    </DropDownItem>
                  ))}
                  {!this.state.books.length && !this.state.loading && (
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
export default AutoCompleteBooks;
