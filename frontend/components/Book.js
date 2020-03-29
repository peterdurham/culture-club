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
  button {
    position: absolute;
    bottom: 0;
    right: 10px;
    border: none;
    background: none;
    color: #fff;
    font-size: 24px;
  }
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
const EditLinkStyles = styled.a`
  position: absolute;
  bottom: -6px;
  right: 50px;
  font-size: 22px;
  color: white;
  cursor: pointer;
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
        <Link
          href={{
            pathname: "update-book",
            query: { id: book.id }
          }}
        >
          <EditLinkStyles>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 576 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>
            </svg>
          </EditLinkStyles>
        </Link>
        <DeleteBook id={book.id}>
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
        </DeleteBook>
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
