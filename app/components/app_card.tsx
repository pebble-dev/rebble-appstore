import { NavLink } from 'react-router';
import Heart from "../icons/heart.svg?react";
import type { ApplicationInfo } from "~/types/Application";

export default function AppCard({ info }: { info: ApplicationInfo }) {
  const applicationLink = (applicationId: string) => {
    return `/application/${applicationId}`;
  };
  return (
    <div className="app-card">
      <NavLink to={applicationLink(info.id)}>
        <img src={info.type == 'watchapp' ? info.list_image['144x144'] : info.screenshot_images[0]['144x168']} />
        <div className="info">
          <div className="title">{info.title}</div>
          <div className="author">by {info.author}</div>
          {info.type == 'watchapp' && <div className="category" style={{ color: `#${info.category_color}` }}>{info.category}</div>}
          <div className="hearts"><Heart /> {info.hearts}</div>
        </div>
      </NavLink>
      <style>{`
        .app-card {
          min-width: 0px;
        }
        .app-card a {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: var(--as-fg-primary);
          text-decoration: none;
        }
        .app-card a img {
          border-radius: 1rem;
        }
        .app-card a .info {
          text-align: center;
          max-width: 100%
        }
        .app-card a .info .title {
          font-weight: 600;
        }
        .app-card a .info .author {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .app-card a .info .hearts {
          color: var(--as-fg-muted)
        }
      `}</style>
    </div>
  );
}