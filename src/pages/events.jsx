import { Helmet } from 'react-helmet-async';
import EventView from 'src/sections/events/event-view';


// ----------------------------------------------------------------------

export default function EventsPage() {
  return (
    <>
      <Helmet>
        <title> Events | Realax </title>
      </Helmet>

      <EventView/>
    </>
  );
}
