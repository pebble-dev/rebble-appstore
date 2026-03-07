import { NavLink, Link, data } from 'react-router';
import Markdown from 'react-markdown'
import type { Route } from "./+types/Watchfaces";
import Carousel from "../components/carousel.tsx";
import AppCard from "../components/app_card.tsx";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`https://appstore-api.rebble.io/api/v1/home/faces`);
  const watchfaces = await res.json();
  return watchfaces;
}

export const handle = {
  type: () => 'watchface',
};

export default function Watchfaces({
  loaderData,
}: Route.ComponentProps) {
  const applicationLink = (applicationId) => {
    return `/application/${applicationId}`;
  };
  const applicationById = (applicationId) => {
    return loaderData.applications.find((application) => application.id == applicationId);
  };
  return (
    <title>{ `Watchfaces` }</title>,
    <meta name="test" content="test" />,

    <div class="home-page">
      { loaderData.banners.length > 0 &&
        <Carousel>
        { loaderData.banners.map((banner) => {
          return (
            <NavLink to={applicationLink(banner.application_id)} key={banner.application_id}>
              <img draggable="false"  class="banner" src={ banner.image['720x320'] }/>
            </NavLink>
          );
        }) }
      </Carousel>
      }
      { loaderData.collections.map((collection) => {
        return (
          <div class="collection" key={collection.slug}>
            <NavLink to={`/collection/${collection.slug}/faces/1`} class="name">
              <h2>{collection.name}</h2>
              <span>See more</span>
            </NavLink>
            <div class="apps">
              { collection.application_ids.slice(0, 6).map((applicationId) => {
                const application = applicationById(applicationId);
                return <AppCard info={application}/>
              }) }
            </div>
          </div>
        );
      }) }
      <style>{`
        .home-page {

        }
        .home-page .banner {
          border-radius: 2rem;
          width: 100%;
        }
        .home-page .collection {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--as-bg-secondary);
          padding: 2rem;
          border-radius: 2rem;
          margin-top: 2rem;
        }
        .home-page .collection .name {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
        }
        .home-page .collection .name h2 {
          margin: 0;
          color: var(--as-fg-primary)
        }
        .home-page .collection .apps {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        }
        @media(max-width: 1200px) {
          .home-page .collection .apps {
            grid-template-columns: 1fr 1fr 1fr
          }
        }
        @media(max-width: 600px) {
          .home-page .collection .apps {
            grid-template-columns: 1fr 1fr
          }
        }
      `}</style>
    </div>
  );
}