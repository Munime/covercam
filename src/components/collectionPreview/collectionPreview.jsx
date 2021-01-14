import "./collectionPreview.styles.scss";
import CollectionItem from "../collectionItem/collectionItem";

// так як дані в мене мають вкладення, то я можу тут деструктуризувати title i масив items. Вони знаходзться в моїх даних, які сюди прилетіли
const CollectionPreview = ({ title, items }) => {
  return (
    <div className="collection-preview">
      <h2 className="title">{title}</h2>
      <div className="preview">
        {items
          // фільтрую масив, щоб він відображав тільки чотири айтеми
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
