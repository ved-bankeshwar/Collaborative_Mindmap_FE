import React from "react";

interface TemplateCardProps {
  title: string;
  image: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, image }) => {
  return (
    <div className="group flex flex-col gap-3 cursor-pointer">
      {/* Card Body */}
      <div
        className="
        w-full aspect-[1.6/1] rounded-lg overflow-hidden 
        bg-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)] 
        transition-all duration-200 ease-in-out 
        group-hover:-translate-y-1 group-hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]
      "
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Card Title */}
      <div className="text-base text-white font-normal pl-[2px]">{title}</div>
    </div>
  );
};

export default TemplateCard;
