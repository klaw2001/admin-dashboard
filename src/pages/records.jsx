import { Helmet } from 'react-helmet-async';

import RecordsView from 'src/sections/records/record-view';

// ----------------------------------------------------------------------

export default function RecordsPage() {
  return (
    <>
      <Helmet>
        <title> Records | Realax </title>
      </Helmet>

      <RecordsView />
    </>
  );
}
