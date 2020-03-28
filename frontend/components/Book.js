import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";

import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteBook from "./DeleteBook";
import AddToCart from "./AddToCart";
import styled from "styled-components";

const BookStyles = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};

  position: relative;
  display: flex;
  flex-direction: column;
  height: 307px;
  width: 194px;
  margin-bottom: 20px;
  overflow: hidden;
  img {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;
export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  };

  render() {
    const { book } = this.props;
    return (
      <BookStyles>
        <Link
          href={{
            pathname: "/book",
            query: { id: book.id }
          }}
        >
          <a style={{ height: "100%" }}>
            <div
              style={{
                background: `url('${book.image}')`,
                backgroundSize: "cover",
                height: "100%",
                borderRadius: "8px"
              }}
            >
              {/* <a>{book.image && <img src={book.image} alt={book.title} />}</a> */}
            </div>
          </a>
        </Link>
        {/* <Title>
          <Link
            href={{
              pathname: "/book",
              query: { id: book.id }
            }}
          >
            <a>{book.title}</a>
          </Link>
        </Title> */}

        {/* <p>{book.description}</p> */}
        {/* 
        <div className="buttonList">
          <Link
            href={{
              pathname: "update",
              query: { id: book.id }
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          <AddToCart id={book.id} />
          <DeleteBook id={book.id}>Delete This Book</DeleteBook>
        </div> */}
      </BookStyles>
    );
  }
}
