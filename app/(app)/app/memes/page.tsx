"use client";
import React, { useEffect, useState } from "react";
import SearchSidebar from "../components/sidebar/SearchSidebar";
import FilterSelector from "./components/FilterSelector";

export type FilterState = {
  favorited: boolean;
  unfavorited: boolean;
  categories: [];
};

const defaultFilterState: FilterState = {
  favorited: false,
  unfavorited: false,
  categories: [],
};

function MemesPage() {
  const [filterState, setFilter] = useState<FilterState>(defaultFilterState);
  const [filtering, setFiltering] = useState(false);

  const [memes, setMemes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/memes")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMemes(data);
      });
  }, []);

  useEffect(filterMemes, [filterState, memes]);

  function filterMemes() {
    if (!filterState.favorited && !filterState.unfavorited) {
      setFilteredMemes([...memes]);
    }
    else if (filterState.favorited) {
      let cp = [...memes];
      setFilteredMemes(cp.filter((meme) => meme["favorite"]));
    }
    else if (filterState.unfavorited) {
      let cp = [...memes];
      setFilteredMemes(cp.filter((meme) => !meme["favorite"]));
    }
    
  }

  const [filteredMemes, setFilteredMemes] = useState<any[]>([ ...memes ]);

  function toggleFilter() {
    setFiltering(!filtering);
  }

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-[35px] font-bold">Memes</h1>
        <div className="flex flex-wrap">
          <div className="mr-auto w-full max-w-[600px]">
            <SearchSidebar />
          </div>
          <div className="my-auto">
            <button className="btn btn-outline h-10">Search</button>
          </div>
        </div>
        <div>
          <button
            className={"btn btn-outline " + (filtering && "btn-clicked")}
            onClick={toggleFilter}
          >
            Show Filter
          </button>
          {filtering && (
            <FilterSelector
              categories={""}
              filterState={filterState}
              setFilter={setFilter}
            />
          )}
        </div>
        {filteredMemes.map((meme) => {
          return <h3 key={meme['id']}>{meme['title']}</h3>
        })}
      </div>
    </div>
  );
}

export default MemesPage;
