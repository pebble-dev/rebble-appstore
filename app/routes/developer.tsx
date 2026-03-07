import { NavLink } from 'react-router';
import type { Route } from "./+types/Developer";
import AppCard from "../components/app_card.tsx";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`https://appstore-api.rebble.io/api/v1/apps/dev/${params.developerId}`);
  const developer = await res.json();
  return developer.data;
}

export const handle = {
  type: () => '',
};

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
    <title>{ `Developer` }</title>,
    <meta name="test" content="test" />,

    <div class="developer-page">
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