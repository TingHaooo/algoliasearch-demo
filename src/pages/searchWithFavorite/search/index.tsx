import { ChangeEvent, useEffect, useState } from "react";

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { SearchIndex } from "algoliasearch";
import useAlgoArticles, { IArticle } from "../../../hooks/useAlgoArticles";
import SearchItem from "./SearchItem";

interface ISearchProps {
  handleButtonClick: (article: IArticle) => void;
  favorites: IArticle[];
  index: SearchIndex;
}

const Search = (props: ISearchProps) => {
  const { handleButtonClick, favorites, index } = props;
  const [search, setSearch] = useState("");
  const { data, error, loading, refetch } = useAlgoArticles<IArticle[]>({
    index,
  });
  const [onSearch$] = useState(() => new Subject<string>());

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch$.next(e.target.value);
  };

  useEffect(() => {
    const subscription = onSearch$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((s: string) => refetch(s));

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>{"Something went wrong :_("}</div>;
  }

  return (
    <div>
      <input
        placeholder="Please enter the keyword"
        style={{ width: "200px", padding: "3px 5px" }}
        value={search}
        onChange={handleOnChange}
      ></input>
      {loading && <div style={{ marginTop: "15px" }}>Loading...</div>}
      {!data?.length && !loading && (
        <div style={{ marginTop: "10px" }}>No result</div>
      )}
      {!!data?.length && !loading && (
        <div>
          {data.map((article) => (
            <SearchItem
              data={article}
              key={article.objectID}
              favorites={favorites}
              handleButtonClick={handleButtonClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
