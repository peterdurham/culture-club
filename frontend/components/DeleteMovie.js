import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_MOVIES_QUERY } from "./Movies";
import styled from "styled-components";

const DELETE_MOVIE_MUTATION = gql`
  mutation DELETE_MOVIE_MUTATION($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

const DeleteButtonStyles = styled.button`
  background: #fff;
  border: none;

  font-size: 2rem;
`;

class DeleteMovie extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_MOVIES_QUERY });
    console.log(data, payload);
    // 2. Filter the deleted item out of the page
    data.movies = data.movies.filter(
      movie => movie.id !== payload.data.deleteMovie.id
    );
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_MOVIES_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_MOVIE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteMovie, { error }) => (
          <DeleteButtonStyles
            onClick={() => {
              if (confirm("Are you sure you want to delete this Movie?")) {
                deleteMovie().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
            </svg>
          </DeleteButtonStyles>
        )}
      </Mutation>
    );
  }
}

export default DeleteMovie;
