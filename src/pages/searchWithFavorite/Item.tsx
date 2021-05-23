import { ReactNode } from "react";
import { IArticle } from "../../hooks/useAlgoArticles";
interface IItemProps {
  data: IArticle;
  button: ReactNode;
}

const Item = (props: IItemProps) => {
  const { data, button } = props;
  return (
    <div
      style={{
        borderBottom: "1px solid black",
        padding: "10px 0px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontWeight: "bold" }}>{data.title}</div>
          <div
            style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
          >
            <div style={{ marginRight: "10px", fontSize: "12px" }}>
              {data.author_name}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {data.categories.map((categorie) => (
                <div
                  key={categorie}
                  style={{
                    marginTop: "3px",
                    marginLeft: "8px",
                    padding: "3px",
                    backgroundColor: "#888",
                    borderRadius: "2px",
                    color: "white",
                  }}
                >
                  {categorie}
                </div>
              ))}
            </div>
          </div>
        </div>
        {button}
      </div>
    </div>
  );
};

export default Item;
