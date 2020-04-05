import Books from "../components/Books";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

const BooksPage = (props) => {
  return (
    <div>
      <div className="flex-apart">
        <h1>Books Page</h1>
        <Link href="/add-book">
          <a className="button">
            <GoPlus />
            Add Book
          </a>
        </Link>
      </div>
      <Books
        filter="all"
        page={parseFloat(props.query.page) || 1}
        cardView={props.cardView}
        setCardView={props.setCardView}
      />
    </div>
  );
};

export default BooksPage;
