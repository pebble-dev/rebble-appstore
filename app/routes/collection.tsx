import { NavLink } from 'react-router';
import type { Route } from "./+types/Collection";
import AppCard from "../components/app_card.tsx";
import { getSettings, buildApiQuery } from "../cookies";

export async function loader({ params, request }: Route.LoaderArgs) {
  const settings = getSettings(request);
  const query = buildApiQuery(settings);
  const url = `https://appstore-api.rebble.io/api/v1/apps/collection/${params.collectionSlug}/${params.type}${query ? `?${query}` : ''}`;
  const res = await fetch(url);
  const collection = await res.json();
  return collection.data;
}

export const handle = {
  type: (loaderData) => (loaderData && loaderData.length > 1) ? loaderData[0].type : '',
};

export default function Collection({
  loaderData,
}: Route.ComponentProps) {
  const applicationLink = (applicationId) => {
    return `/application/${applicationId}`;
  };
  const applicationById = (applicationId) => {
    return loaderData.applications.find((application) => application.id == applicationId);
  };
  return (
    <title>{ `Collection` }</title>,
    <meta name="test" content="test" />,

    <div class="collection-page">
      <div class="apps">
        { loaderData.map((application) => {
          return <AppCard info={application}/>
        }) }
      </div>
      <style>{`
        .collection-page {

        }
        .collection-page .apps {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        }
        @media(max-width: 1200px) {
          .collection-page.apps {
            grid-template-columns: 1fr 1fr 1fr
          }
        }
        @media(max-width: 600px) {
          .collection-page .apps {
            grid-template-columns: 1fr 1fr
          }
        }
      `}</style>
    </div>
  );
}