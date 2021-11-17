import Link from 'next/link';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';

const NavItem = ({ title, link, contents }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 889 });

  // Small-screen variant
  if (isMobile) {
    if (link === undefined) {
      return (
        <div>
          <button
            type="button"
            className="flex items-center space-x-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h2 className="text-gray-200 w-max">{title}</h2>
            <FiChevronDown
              className={`heading-secondary text-gray-200  transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {isOpen &&
            contents.map((content) => (
              <Link href={content.link} passHref key={content.name}>
                <h3 className="text-xl text-gray-200 transition-colors duration-200 hover:text-gray-300 beta">
                  {content.name}
                </h3>
              </Link>
            ))}
        </div>
      );
    }
    return (
      <Link href={link}>
        <a className="">
          <h2 className="text-gray-200 transition-colors duration-200 hover:text-gray-300">
            {title}
          </h2>
        </a>
      </Link>
    );
  } // Large-screen variant
  // Items which are grouped into categories
  if (link === undefined) {
    return (
      <>
        <button
          type="button"
          className="flex items-center transition-colors hover:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="font-medium lg:text-xs">{title}</p>
          <FiChevronDown
            className={`w-5 h-5 ml-1 transition-transform lg:w-4 lg:h-4 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`absolute left-0 w-full py-5 -translate-x-5 bg-gray-900 border-b border-gray-700 bg-opacity-90 top-18 lg:top-16 space-y-2 ${
            isOpen ? '' : 'hidden'
          }`}
        >
          {contents.map((content) => {
            console.info(content);
            return (
              <Link href={content.link} passHref key={content.name}>
                <div className="container beta">{content.name}</div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }

  // Items that are standalone
  return (
    <Link href={link}>
      <a className="ml-8 font-medium text-gray-400 transition-colors lg:text-xs hover:text-gray-300 lg:ml-7">
        {title}
      </a>
    </Link>
  );
};

export default NavItem;
