import Movies from "../components/Movies";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

const MoviesPage = (props) => {
  return (
    <div>
      <div className="flex-apart">
        <h1>Movies Page</h1>
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
    </div>
  );
};

export default MoviesPage;
