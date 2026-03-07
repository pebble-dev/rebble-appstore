import { NavLink } from 'react-router';
import type { Route } from "./+types/Category";
import AppCard from "../components/app_card.tsx";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`https://appstore-api.rebble.io/api/v1/apps/category/${params.categorySlug}?sort=${params.sort}`);
  const category = await res.json();
  return category.data;
}

export const handle = {
  type: () => 'watchapp',
};

export default function Category({
  loaderData,
  params,
}: Route.ComponentProps) {
  const applicationLink = (applicationId) => {
    return `/application/${applicationId}`;
  };
  const applicationById = (applicationId) => {
    return loaderData.applications.find((application) => application.id == applicationId);
  };
  return (
    <title>{ `Category` }</title>,
    <meta name="test" content="test" />,

    <div class="category-page">
      <div class="switcher">
        <NavLink to={ `/category/${params.categorySlug}/hearts/1` }>Most Loved</NavLink>
        <NavLink to={ `/category/${params.categorySlug}/updated/1` }>Recently Added</NavLink>
      </div>
      <div class="apps">
        { loaderData.map((application) => {
          return <AppCard info={application}/>
        }) }
      </div>
      <style>{`
        .category-page {

        }
        .category-page .apps {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        }
        .switcher {
          display: flex;
          border: 1px solid var(--as-brand);
          max-width: 40rem;
          margin: auto;
          margin-bottom: 2rem;
        }
        .switcher a {
          width: 50%;
          text-align: center;
          text-decoration: none;
          padding: 0.5rem 1rem;
        }
        .switcher a:hover {
          background-color: var(--as-brand-secondary);
          color: var(--as-brand-fg);
        }
        .switcher a.active {
          background-color: var(--as-brand);
          color: var(--as-brand-fg);
        }
        @media(max-width: 1200px) {
          .category-page.apps {
            grid-template-columns: 1fr 1fr 1fr
          }
        }
        @media(max-width: 600px) {
          .category-page .apps {
            grid-template-columns: 1fr 1fr
          }
        }
      `}</style>
    </div>
  );
}