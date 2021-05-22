import { useHistory } from "react-router-dom";

interface ITabInfo {
  path: string;
  displayName: string;
}

interface ITabsProps {
  tabsInfo: ITabInfo[];
}

const Tabs = (props: ITabsProps) => {
  const { tabsInfo } = props;
  const history = useHistory();

  return (
    <div>
      {tabsInfo.map((info) => (
        <div key={info.displayName} onClick={() => history.push(info.path)}>
          {info.displayName}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
