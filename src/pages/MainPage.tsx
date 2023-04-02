import React, { FC } from "react";
import { Link } from "react-router-dom";

const MainPage: FC = () => {
    return (
        <div className="main-page">
            <Link to={"/catalog"}> Главная страница в разработке
            </Link>
        </div>
    );
};

export default MainPage;
