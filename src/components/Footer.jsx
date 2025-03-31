import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 mt-8 w-full">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">
          LEGO® is a trademark of the LEGO Group, which does not sponsor, authorize or endorse this web app.
        </p>
        <p>
          Built by <a href="https://www.linkedin.com/in/kingsley-fong/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Kingsley Fong</a> at the University of Waterloo. Mechanical Engineer.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 