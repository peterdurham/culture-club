import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { GiWhiteBook } from "react-icons/gi";

const ADD_TO_TO_READ_MUTATION = gql`
  mutation addToToRead($id: ID!) {
    addToToRead(id: $id) {
      id
    }
  }
`;

class AddToToRead extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_TO_READ_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToToRead, { error, loading }) => (
          <button onClick={addToToRead} disabled={loading} className="button">
            To Read <GiWhiteBook />
          </button>
        )}
      </Mutation>
    );
  }
}
export default AddToToRead;
