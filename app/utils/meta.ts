import type { MetaDescriptor } from "react-router";

export function mergeMeta(matches: UIMatch[], routeMeta: MetaDescriptor[]): MetaDescriptor[] {
  const getKey = (m: MetaDescriptor) =>
    "name" in m ? m.name :
    "property" in m ? m.property :
    "title" in m ? "title" : null;

  const routeKeys = new Set(routeMeta.map(getKey).filter(Boolean));

  const filtered = matches.flatMap(m => m.meta ?? []).filter(m => !routeKeys.has(getKey(m)));
  return [...filtered, ...routeMeta];
}