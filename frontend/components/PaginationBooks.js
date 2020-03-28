import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import Head from "next/head";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    booksConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        const count = data.booksConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page;
        return (
          <PaginationStyles>
            <Head>
              <title>
                Culture Club! - Page {page} of {pages}{" "}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: "books",
                query: { page: page - 1 }
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                ← Prev
              </a>
            </Link>
            <p>
              Page {page} of {pages}!
            </p>
            <p>{count} books total</p>
            <Link
              prefetch
              href={{
                pathname: "books",
                query: { page: page + 1 }
              }}
            >
              <a className="next" aria-disabled={page >= pages}>
                → Next
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};
export default Pagination;
