import "./menuItem.styles.scss";
import { withRouter } from "react-router-dom";

// деструктуризую всі необхідні мені дані
const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => {
  return (
    <div
      //based on property "size" (I have it in data) I can play with styling
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
