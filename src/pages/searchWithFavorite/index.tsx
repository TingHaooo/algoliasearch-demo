import Favorite from "./Favorite";
import Search from "./Search";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { IArticle } from "../../hooks/useAlgoArticles";
import { TabList, Tab, TabPanel, TabPanels } from "../../components";

const Index = () => {
  const history = useHistory();
  const location = useLocation();

  const [favorites, setFavorites] = useState<IArticle[]>([]);

  const handleUnsave = (id: string) => {
    setFavorites((favorites) =>
      favorites.filter((favorite) => favorite.objectID !== id)
    );
  };

  const handleSave = (article: IArticle) => {
    setFavorites((favorites) => [...favorites, article]);
  };

  const handleButtonClick = (article: IArticle) => {
    const isInFavorites = favorites
      .map((favorite) => favorite.objectID)
      .includes(article.objectID);
    if (isInFavorites) {
      handleUnsave(article.objectID);
      return;
    }

    handleSave(article);
  };

  return (
    <>
      <TabList>
        <Tab
          handleOnClick={() => history.push("/search")}
          isCur={location.pathname === "/search"}
        >
          Search
        </Tab>
        <Tab
          handleOnClick={() => history.push("/favorite")}
          isCur={location.pathname === "/favorite"}
        >
          Favorite
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel isCur={location.pathname === "/search"}>
          <Search handleButtonClick={handleButtonClick} favorites={favorites} />
        </TabPanel>
        <TabPanel isCur={location.pathname === "/favorite"}>
          <Favorite
            favorites={favorites}
            handleButtonClick={handleButtonClick}
          />
        </TabPanel>
      </TabPanels>
    </>
  );
};

export default Index;
