import { redirect } from 'react-router';

export function loader({ params }) {
  return redirect(`/collection/${params.collectionSlug}/${type}/1`);
}