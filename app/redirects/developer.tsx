import { redirect } from 'react-router';

export function loader({ params }) {
  return redirect(`/developer/${params.developerId}`);
}