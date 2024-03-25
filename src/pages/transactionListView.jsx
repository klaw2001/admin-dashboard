import { Helmet } from 'react-helmet-async';
import TransactionListView from 'src/sections/transaction-lists/transaction-list-view';


// ----------------------------------------------------------------------

export default function TransactionListPage() {
  return (
    <>
      <Helmet>
        <title> Transaction Lists | Realax </title>
      </Helmet>

      <TransactionListView/>
    </>
  );
}
