import { NavLink } from 'react-router';
import Markdown from 'react-markdown'
import type { Route } from "./+types/changelog";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`https://appstore-api.rebble.io/api/v1/apps/id/${params.applicationId}`);
  const application = await res.json();
  if (application.data.length == 0) {
    throw data("Record Not Found", { status: 404 });
  }
  return application.data[0];
}

export const handle = {
  type: (loaderData) => loaderData ? loaderData.type : '',
};

export default function Changelog({
  loaderData,
}: Route.ComponentProps) {
  const applicationLink = `/application/${loaderData.id}`;
  return (
    <title>{loaderData.title} | Watchapps</title>,
    <meta name="test" content="test" />,

    <div>
      <h1>Changelog for <NavLink to={applicationLink}>{loaderData.title}</NavLink></h1>
      { loaderData.changelog.map((change) => {
      	return (
      	  <div key={change.version}>
      	    <h3>{change.version}</h3>
      	    <p>{change.published_date}</p>
      	    <Markdown>{change.release_notes}</Markdown>
      	  </div>
      	);
      })}
    </div>
  );
}