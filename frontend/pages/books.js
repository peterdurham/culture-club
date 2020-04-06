import Books from "../components/books/Books";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

const BooksPage = (props) => {
  return (
    <div>
      <div className="flex-apart">
        <h1 className="page-header">Books Page</h1>
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
    </div>
  );
};

export default BooksPage;
