import { ChangeEvent, useState } from "react";
import Item from "./Item";
import { useAlgoArticles } from "../../hooks";
import { IArticle } from "../../hooks/useAlgoArticles";
import Button from "./Button";

interface ISearchItemProps {
  favorites: IArticle[];
  data: IArticle;
  handleButtonClick: (data: IArticle) => void;
}

const SearchItem = (props: ISearchItemProps) => {
  const { data, handleButtonClick, favorites } = props;
  const [isHover, setIsHover] = useState(false);
  const isInFavorites = favorites
    .map((favorite) => favorite.objectID)
    .includes(data.objectID);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Item
        data={data}
        key={data.objectID}
        button={
          isInFavorites ? (
            <Button
              isActive={isHover}
              handleButtonClick={() => handleButtonClick(data)}
            >
              {isHover ? "Unsave" : "Saved"}
            </Button>
          ) : isHover ? (
            <Button
              isActive={true}
              handleButtonClick={() => handleButtonClick(data)}
            >
              Save
            </Button>
          ) : (
            <></>
          )
        }
      ></Item>
    </div>
  );
};

interface ISearchProps {
  handleButtonClick: (article: IArticle) => void;
  favorites: IArticle[];
}

const Search = (props: ISearchProps) => {
  const { handleButtonClick, favorites } = props;
  const [search, setSearch] = useState("");
  const { data, error, loading, refetch } = useAlgoArticles<IArticle[]>();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    refetch(e.target.value);
  };

  if (error) {
    return <div>{"Something went wrong :_("}</div>;
  }

  console.log("data");
  console.log(data);

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
