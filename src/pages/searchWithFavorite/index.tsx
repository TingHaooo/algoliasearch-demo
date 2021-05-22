import Favorite from "./Favorite";
import Search from "./Search";
import Tabs from "../../components/Tabs";

interface TabsInfo {
  displayName: string;
  path: string;
}

const tabsInfo: TabsInfo[] = [
  {
    displayName: "Search",
    path: "/search",
  },
  {
    displayName: "Favorite",
    path: "/favorite",
  },
];

const index = () => {
  return (
    <div>
      <Tabs tabsInfo={tabsInfo} />
      <Favorite />
      <Search />
    </div>
  );
};

export default index;
