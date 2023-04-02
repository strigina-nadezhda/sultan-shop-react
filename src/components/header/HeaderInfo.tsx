import React from "react";
import { RiMapPinLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";

export const HeaderInfo: React.FC = () => {
  return (
    <div className="info">
      <div className="info-content">
        <RiMapPinLine className="info-content_icon" />

        <div className="info-content_text">
          <p className="bold black">г. Кокчетав, ул. Ж. Ташенова 129Б</p>
          <p className="think blue"> (Рынок Восточный)</p>
        </div>
      </div>
      <div className="info-content">
        <FiMail className="info-content_icon" />
        <div className="info-content_text">
          <p className="bold black"> opt.sultan@mail.ru </p>
          <p className="think blue"> На связи в любое время</p>
        </div>
      </div>
    </div>
  );
};
