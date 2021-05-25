import { IArticle } from "../../../hooks/useAlgoArticles";
import FavoriteItem from "./FavoriteItem";

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
