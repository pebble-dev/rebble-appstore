import { redirect } from 'react-router';

export function loader({ params }) {
  const type = params.type ? params.type : 'watchapps';
  return redirect(`/search/${type}/1`);
}