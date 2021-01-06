import "./homepage.styles.scss";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="directory-menu">
        <div className="menu-item">
          <div className="content">
            <h1 className="title">Smartphone</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
        <div className="menu-item">
          <div className="content">
            <h1 className="title">Laptop</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
        <div className="menu-item">
          <div className="content">
            <h1 className="title">Webcam</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
        <div className="menu-item">
          <div className="content">
            <h1 className="title">Android</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
        <div className="menu-item">
          <div className="content">
            <h1 className="title">iOs</h1>
            <span className="subtitle">Shop Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
