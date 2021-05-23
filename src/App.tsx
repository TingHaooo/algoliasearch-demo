import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import algoliasearch, { SearchIndex } from "algoliasearch";
import { createContext } from "react";

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APLICATION_ID as string,
  process.env.REACT_APP_ALGOLIA_APLICATION_KEY as string
);
const index = client.initIndex(
  process.env.REACT_APP_ALGOLIA_INDEX_NAME as string
);

export type AlgoContext = {
  index: SearchIndex;
};

export const algoContext = createContext<AlgoContext>({
  index,
});

const AlgoProvider = algoContext.Provider;

const App = () => {
  return (
    <AlgoProvider value={{ index }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AlgoProvider>
  );
};

export default App;
