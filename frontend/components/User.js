import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      toWatch {
        id
        movie {
          id
          title
        }
      }
      seenIt {
        id
        movie {
          id
          title
        }
      }
      toRead {
        id
        book {
          id
          title
        }
      }
      readIt {
        id
        book {
          id
          title
        }
      }
      toPlay {
        id
        game {
          id
          title
        }
      }
      playedIt {
        id
        game {
          id
          title
        }
      }
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

const User = props => {
  return (
    <Query {...props} query={CURRENT_USER_QUERY}>
      {payload => props.children(payload)}
    </Query>
  );
};

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
