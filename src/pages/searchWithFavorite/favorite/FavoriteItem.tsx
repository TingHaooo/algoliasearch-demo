import Button from "../Button";
import Item from "../Item";
import { useState } from "react";
import { IArticle } from "../../../hooks/useAlgoArticles";

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

export default FavoriteItem;
