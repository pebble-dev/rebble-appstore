import { NavLink } from 'react-router';
import Heart from "../icons/heart.svg?react";

export default function AppCard({ info }) {
  const applicationLink = (applicationId) => {
    return `/application/${applicationId}`;
  };
  return (
    <div class="app-card">
      <NavLink to={applicationLink(info.id)}>
        <img src={ info.type == 'watchapp' ? info.list_image['144x144'] : info.screenshot_images[0]['144x168'] }/>
        <div class="info">
          <div class="title">{ info.title }</div>
          <div class="author">by { info.author }</div>
          { info.type == 'watchapp' && <div class="category" style={ { color: `#${info.category_color}` } }>{ info.category }</div> }
          <div class="hearts"><Heart/> { info.hearts }</div>
        </div>
      </NavLink>
      <style>{`
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
        }
        .app-card a .info .title {
          font-weight: 600;
        }
        .app-card a .info .hearts {
          color: var(--as-fg-muted)
        }
      `}</style>
    </div>
  );
}