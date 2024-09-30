import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import '../CustomCard.css';

interface CustomCardProps {

  title: string;
  content: string;
  backgroundColor: string;
}





const CustomCard: React.FC<CustomCardProps> = ({ title, content, backgroundColor}) => {
  return (
    <div className="custom-card" style={{backgroundColor }}>
      <div className="custom-card-title">{title}</div>
      <div className="custom-card-content">{content}</div>
    </div>
  );
};

export default CustomCard;
