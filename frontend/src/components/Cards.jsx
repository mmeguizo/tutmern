import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import LoadingSpinner from "./ui/LoadingSpinner";
// tester

const Cards = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  console.log(loading);
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  // TODO => ADD RELATIONSHIP BETWEEN USER AND TRANSACTION
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {/* <Card cardType={"saving"} /> */}
        {!loading &&
          data.transactions.map((transactions) => (
            <Card key={transactions._id} transaction={transactions} />
          ))}
        {!loading && data.transactions.length === 0 && (
          <p className="text-2xl text-center font-bold w-full">
            No transactions yet
          </p>
        )}
      </div>
    </div>
  );
};
export default Cards;
