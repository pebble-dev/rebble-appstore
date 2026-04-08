import AppCard from "../components/app_card";
import { mergeMeta } from "../utils/meta"
import type { Route } from "./+types/collection";
import type { Application } from "~/types/AppstoreApi";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`https://appstore-api.rebble.io/api/v1/apps/collection/${params.collectionSlug}/${params.type}`);
  const collection = await res.json();
  return collection.data as Application[];
}

export const handle = {
  type: (loaderData: { type: string }[]) => (loaderData && loaderData.length > 1) ? loaderData[0].type : '',
};

export const meta: Route.MetaFunction = ({ matches }) => mergeMeta(matches, [
  { title: "Collection | Rebble Appstore" },
  { name: "og:title", content: "Collection" },
  { name: "og:description", content: "Browse the collection on the Rebble Appstore" },
]);

export default function Collection({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="collection-page">
      <div className="apps">
        {loaderData.map((application) => {
          return <AppCard info={application} />
        })}
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