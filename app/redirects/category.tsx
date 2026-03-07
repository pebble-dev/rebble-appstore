import { redirect } from 'react-router';

export function loader({ params }) {
  const sort = params.sort ? params.sort : 'hearts';
  return redirect(`/category/${params.categorySlug}/${sort}/1`);
}