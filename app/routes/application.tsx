import { NavLink, Link, data } from 'react-router';
import Markdown from 'react-markdown'
import type { Route } from "./+types/application";
import Carousel from "../components/carousel.tsx";
import { mergeMeta } from "../utils/meta.ts"

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

export const meta: Route.MetaFunction = ({ matches, loaderData }) => mergeMeta(matches, [
  { title: `${loaderData.title} | Rebble Appstore` },
  { name: "og:title", content: loaderData.title },
  { name: "og:description", content: loaderData.description },
]);

export default function Application({
  loaderData,
}: Route.ComponentProps) {
  const changelogLink = `/application/${loaderData.id}/changelog`;
  const developerLink = `/developer/${loaderData.developer_id}`;
  return (
    <div className="application-page">
      { loaderData.header_images &&
        <Carousel>
        { loaderData.header_images.map((banner) => {
          return (
            <img draggable="false"  className="banner" key={banner['720x320']} src={ banner['720x320'] }/>
          );
        }) }
        </Carousel>
      }
      <div className="application-header">
        {loaderData.type == 'watchapp' && <img src={loaderData.list_image['144x144']} />}
        <div>
          <h1>{loaderData.title}</h1>
          <p>by <NavLink to={developerLink}>{loaderData.author}</NavLink></p>
        </div>
      </div>


      <div className="application-content">
        <div className="application-main">
          {/* Figure out the screenshots component, also hardcoded resolution */}
          { loaderData.screenshot_images.map((screenshot) => {
            return (
              <img src={ screenshot['144x168'] }/>
            );
          }) }

          <div className="card">
            <h3>About</h3>
            <Markdown>{loaderData.description}</Markdown>
          </div>

          <div className="card">
            <h3>What's new?</h3>
            <h4>{loaderData.latest_release.version}</h4>
            {loaderData.latest_release.published_date}
            <Markdown>{loaderData.latest_release.release_notes}</Markdown>
            <NavLink to={changelogLink}>Changelog</NavLink>
          </div>
        </div>

        <div className="application-side">
          <div className="card">
            <h3>Links</h3>
            <p><Link to={loaderData.website}>Website</Link></p>
            <p><Link to={loaderData.source}>Source Code</Link></p>
            <p><Link to={loaderData.discourse_url}>Rebble Dev Forum Topic</Link></p>
          </div>
        </div>
      </div>
      <style>{`
        .application-page {

        }
        .application-page .banner {
          border-radius: 2rem;
          width: 100%;
        }
        .application-header {
          display: flex;
          gap: 2rem;
          align-items: center;
          margin-bottom: 2rem;
        }
        .application-header img {
          border-radius: 1rem;
        }
        .application-header h1, .application-header p {
          margin: 0;
        }
        .application-content {
          display: flex;
          gap: 2rem;
        }
        .application-content .application-main {
          width: 75%;
        }
        .application-content .application-side {
          width: 25%;
        }
      `}</style>
    </div>
  );
}