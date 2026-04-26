import { useState, type ChangeEventHandler, type KeyboardEventHandler } from "react";
import AppCard from "~/components/app_card";
import type { Application, CollectionOverview } from "~/types/AppstoreApi";
import type { Route } from "../routes/+types/search";

export default function Search({ params }: Route.ComponentProps) {
  const searchTagFilters = params.type === "watchapps" ? "(watchapp,companion-app)" : "watchface";

  const [searchText, setSearchText] = useState<string>();
  const [searchResults, setSearchResults] = useState<Application[]>([]);

  const [searchDebounceTimeout, setSearchDebounceTimeout] = useState<NodeJS.Timeout>();

  const searchTextChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    clearTimeout(searchDebounceTimeout);
    setSearchText(event.target.value);

    setSearchDebounceTimeout(setTimeout(sendSearchRequest, 200));
  };

  const searchTextKeydownHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
    switch (event.key) {
      case "Enter":
        forceStartSearch();
        break;
    }
  };

  const forceStartSearch = () => {
    clearTimeout(searchDebounceTimeout);
    sendSearchRequest();
  };

  const sendSearchRequest = () => {
    if (!searchText) return;

    fetch(`https://7683ow76eq-dsn.algolia.net/1/indexes/rebble-appstore-production/query`, {
      method: "POST",
      headers: {
        "x-algolia-api-key": "252f4938082b8693a8a9fc0157d1d24f",
        "x-algolia-application-id": "7683OW76EQ",
      },
      body: JSON.stringify({
        params: new URLSearchParams({
          query: searchText,
          tagFilters: searchTagFilters,
          hitsPerPage: "999",
          page: "0",
        }).toString(),
      }),
    }).then(async (res) => {
      if (!res.ok) console.error(await res.text());
      const results = await res.json();
      setSearchResults(results.hits);
    });
  };

  return (
    <div className="search-page">
      <input
        className="search-bar"
        value={searchText}
        onChange={searchTextChangeHandler}
        onBlur={forceStartSearch}
        onKeyDown={searchTextKeydownHandler}
        placeholder="Search..."
      ></input>

      <div className="search-results">
        {searchResults.map((application) => {
          return <AppCard info={application} key={application.id}></AppCard>;
        })}
      </div>

      <style>
        {`.search-page {
          display: flex;
          flex-direction: column;
        }
        .search-bar {
          flex-grow: 999;
        }

        .search-results {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr 1fr 1fr;
        }
        `}
      </style>
    </div>
  );
}
