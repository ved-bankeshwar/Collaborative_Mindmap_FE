import React from 'react';
import './TemplateCard.css';

const TemplateCard = ({ title, image }) => {
  return (
    <div className="template-card-wrapper">
      <div className="template-card-body">
        <img src={image} alt={title} className="template-preview-img" />
      </div>
      <div className="template-card-title">{title}</div>
    </div>
  );
};

export default TemplateCard;