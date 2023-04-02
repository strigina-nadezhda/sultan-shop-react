import { FC } from "react";
import { useMatches } from "react-router-dom";

import "../sass/breadcrumbs.scss";

interface CrumbHandle {
  crumb(data: any): JSX.Element;
}

interface MatchWithCrumb {
  handle: CrumbHandle;
  data: unknown;
}

export const Breadcrumbs: FC = () => {
  const matches = useMatches();
  const matchesWithCrumbs: MatchWithCrumb[] = [];

  matches.forEach((match) => {
    if (isMatchWithCrumb(match)) {
      matchesWithCrumbs.push(match);
    }
  });

  return (
    <div className="breadcrumbs-wrapper">
      <ol className="breadcrumbs">
        {matchesWithCrumbs
          .map((e) => e.handle.crumb(e.data))
          .map((e, index) => (
            <li className="breadcrumb" key={index}>
              {e}
            </li>
          ))}
      </ol>
    </div>

  );
};

function isMatchWithCrumb(match: { handle: unknown }): match is MatchWithCrumb {
  let handle = match.handle as CrumbHandle;
  return handle?.crumb !== undefined;
}
