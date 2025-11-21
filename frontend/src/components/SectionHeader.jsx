import React from "react";

const SectionHeader = ({ heading, paragraph }) => {
  return (
    <div className="w-[82%] mx-auto my-12 text-center">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-800 mb-3 sm:mb-4 tracking-wide">
        {heading}
      </h2>

      {/* Paragraph — wrap allowed on small screens */}
      <p className="text-gray-600 text-sm sm:text-base md:text-lg whitespace-normal sm:whitespace-normal lg:whitespace-nowrap overflow-hidden text-ellipsis px-2 sm:px-4">
        {paragraph}
      </p>
    </div>
  );
};

export default SectionHeader;
