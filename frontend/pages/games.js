import Games from "../components/games/Games";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

const GamesPage = (props) => {
  return (
    <div>
      <div className="flex-apart">
        <h1 className="page-header">Games Page</h1>
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
  );
};

export default GamesPage;
