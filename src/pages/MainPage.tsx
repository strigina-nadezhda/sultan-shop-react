import React, { FC } from "react";
import { Link } from "react-router-dom";

const MainPage: FC = () => {
    return (
        <div className="main-page">
            <Link to={"/catalog"}><img src="/images/Баннер.png" alt="main" className="main-img" />
            </Link>
        </div>
    );
};

export default MainPage;