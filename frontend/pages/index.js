import Link from "next/link";

import Items from "../components/Items";
import Movies from "../components/Movies";
import Books from "../components/Books";
import Games from "../components/Games";
import { GoPlus } from "react-icons/go";

const Home = (props) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex-apart">
          <h1>Movies</h1>
          <Link href="/add-movie">
            <a className="button new-button">
              Add Movie
              <GoPlus />
            </a>
          </Link>
        </div>

        <Movies
          filter="all"
          page={parseFloat(props.query.page) || 1}
          cardView={props.cardView}
          setCardView={props.setCardView}
        />

        <div className="flex-apart">
          <h1>Books</h1>
          <Link href="/add-book">
            <a className="button new-button">
              Add Book
              <GoPlus />
            </a>
          </Link>
        </div>

        <Books
          filter="all"
          page={parseFloat(props.query.page) || 1}
          cardView={props.cardView}
          setCardView={props.setCardView}
        />
        <div className="flex-apart">
          <h1>Games</h1>
          <Link href="/add-game">
            <a className="button new-button">
              Add Game
              <GoPlus />
            </a>
          </Link>
        </div>
        <Games
          filter="all"
          page={parseFloat(props.query.page) || 1}
          cardView={props.cardView}
          setCardView={props.setCardView}
        />
      </div>
    </div>
  );
};
export default Home;
