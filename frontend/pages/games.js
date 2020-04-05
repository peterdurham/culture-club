import Games from "../components/Games";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

const GamesPage = (props) => {
  return (
    <div>
      <div className="flex-apart">
        <h1>Games Page</h1>
        <Link href="/add-game">
          <a className="button">
            <GoPlus />
            Add Game
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
  );
};

export default GamesPage;
