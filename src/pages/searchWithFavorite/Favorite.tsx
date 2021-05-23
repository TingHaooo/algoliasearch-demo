import { useState } from "react";
import { IArticle } from "../../hooks/useAlgoArticles";
import Button from "./Button";
import Item from "./Item";

interface IFavoriteItemProps {
  favorite: IArticle;
  handleButtonClick: (data: IArticle) => void;
}

const FavoriteItem = (props: IFavoriteItemProps) => {
  const { favorite, handleButtonClick } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Item
        data={favorite}
        key={favorite.objectID}
        button={
          <Button
            isActive={isHover}
            handleButtonClick={() => handleButtonClick(favorite)}
          >
            {isHover ? "Unsave" : "Saved"}
          </Button>
        }
      ></Item>
    </div>
  );
};

interface IFavoriteProps {
  favorites: IArticle[];
  handleButtonClick: (article: IArticle) => void;
}

const Favorite = (props: IFavoriteProps) => {
  const { favorites, handleButtonClick } = props;
  return (
    <div>
      {favorites.map((favorite) => (
        <FavoriteItem
          key={favorite.objectID}
          favorite={favorite}
          handleButtonClick={handleButtonClick}
        />
      ))}
    </div>
  );
};

export default Favorite;
