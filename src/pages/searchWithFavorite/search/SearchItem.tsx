import Item from "../Item";
import { IArticle } from "../../../hooks/useAlgoArticles";
import Button from "../Button";
import { useState } from "react";

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

export default SearchItem;
