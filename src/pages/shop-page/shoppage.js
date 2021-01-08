import React from "react";
import SHOP_DATA from "./shopData";
import CollectionPreview from "../../components/collectionPreview/collectionPreview";
import "./shoppage.styles.scss";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    // дані поміщаються в стейт під своїм ключем (Колекції)
    this.state = {
      collections: SHOP_DATA,
    };
  }
  render() {
    // деструктуризую дані зі стейту, щоб зробити з ними ітерацію з допомогою меп
    const { collections } = this.state;
    return (
      <div>
        {collections.map(({ id, ...collectionProps }) => (
          // тут беру тільки потрібне мені АЙДІ а решта даних з допомогою трьох крапок прокидую дальше
          <CollectionPreview key={id} {...collectionProps} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
