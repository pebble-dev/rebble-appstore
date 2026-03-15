import { NavLink } from 'react-router';
import type { Route } from "./+types/Developer";
import AppCard from "../components/app_card.tsx";
import { mergeMeta } from "../utils/meta.ts"

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`https://appstore-api.rebble.io/api/v1/apps/dev/${params.developerId}`);
  const developer = await res.json();
  if (developer.data.length == 0) {
    throw data("Record Not Found", { status: 404 });
  }
  return developer.data;
}

export const handle = {
  type: () => '',
};

export const meta: Route.MetaFunction = ({ matches, loaderData }) => mergeMeta(matches, [
  { title: `${loaderData[0].author} | Rebble Appstore` },
  { name: "og:title", content: loaderData[0].author },
  { name: "og:description", content: "Browse the apps by the developer on the Rebble Appstore" },
]);

export default function Developer({
  loaderData,
}: Route.ComponentProps) {
  const applicationLink = (applicationId) => {
    return `/application/${applicationId}`;
  };
  const applicationById = (applicationId) => {
    return loaderData.applications.find((application) => application.id == applicationId);
  };
  return (
    <div class="developer-page">
      <title>{ `${ loaderData[0].author } | Rebble Appstore` }</title>
      <meta name="test" content="test" />

      <div class="apps">
        { loaderData.map((application) => {
          return <AppCard info={application}/>
        }) }
      </div>
      <style>{`
        .developer-page {

        }
        .developer-page .apps {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        }
        @media(max-width: 1200px) {
          .developer-page.apps {
            grid-template-columns: 1fr 1fr 1fr
          }
        }
        @media(max-width: 600px) {
          .developer-page .apps {
            grid-template-columns: 1fr 1fr
          }
        }
      `}</style>
    </div>
  );
}