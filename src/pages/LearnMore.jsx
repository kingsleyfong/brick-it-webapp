import React from 'react';
import { Link } from 'react-router-dom';

const LearnMore = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="/learnMore.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-15" 
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">About Brick It</h1>
        
        {/* Team Introduction */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            This incredible first of its kind complex project was created by:
          </h2>
          
          {/* Team Members with Photos - 4 equal columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Kingsley Fong */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/kingsley.png" 
                  alt="Kingsley Fong" 
                  className="w-full h-full object-cover"
                />
              </div>
              <a 
                href="https://www.linkedin.com/in/kingsley-fong/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 font-medium hover:underline"
              >
                Kingsley Fong
              </a>
            </div>
            
            {/* Joseph Schuurman */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/joseph.png" 
                  alt="Joseph Schuurman" 
                  className="w-full h-full object-cover"
                />
              </div>
              <a 
                href="https://www.linkedin.com/in/j2schuurman/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 font-medium hover:underline"
              >
                Joseph Schuurman
              </a>
            </div>
            
            {/* Victor Constantin Radu */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/victor.png" 
                  alt="Victor Constantin Radu" 
                  className="w-full h-full object-cover"
                />
              </div>
              <a 
                href="https://www.linkedin.com/in/victor-radu-94a577345/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 font-medium hover:underline"
              >
                Victor Constantin Radu
              </a>
            </div>
            
            {/* Adam Benaissa */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/adam.png" 
                  alt="Adam Benaissa" 
                  className="w-full h-full object-cover"
                />
              </div>
              <a 
                href="https://www.linkedin.com/in/adambenaissa/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 font-medium hover:underline"
              >
                Adam Benaissa
              </a>
            </div>
          </div>
        </div>
        
        {/* Project Description */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mb-12">
          <div className="prose prose-lg max-w-none text-gray-800">
            <p className="mb-4">
              This web application is the result of a term design project for ME 101: Introduction to Mechanical Engineering Practice 2 at the University of Waterloo. Developed by Group 17 — Kingsley Fong, Adam Benaissa, Victor Constantin Radu, and Joseph Schuurman — our project explores how automation can transform LEGO building into a creative and accessible digital experience.
            </p>
            
            <p className="mb-4">
              Our goal was to build an EV3-powered robot capable of accurately placing 1x1 LEGO bricks onto a 16x16 stud baseplate within 10 seconds per piece, allowing users to design and construct both 2D mosaics and 3D structures that would be difficult to build manually. This web app complements that robot by allowing users to generate building instructions from either AI-generated or uploaded images and 3D models.
            </p>
            
            <p className="mb-4">
              The interface lets users design mosaics using a 16x16 grid and LEGO-compatible color selection, or convert STL files into LEGO voxel visualizations — all exportable as `.txt` instructions readable by our EV3 robot. Constraints included using only LEGO Mindstorms EV3 components and implementing all logic client-side using JavaScript, Pyodide, and WebAssembly. Netlify was chosen for deployment due to its static hosting capabilities.
            </p>
            
            <p className="mb-6">
              Our group focused on merging physical prototyping with intuitive, browser-based design tools, giving users the power to explore creativity while automating the repetitive, precision-heavy tasks of LEGO building.
            </p>
            
            <p className="mb-4 font-semibold text-xl">
              This is more than a term project — it's a working LEGO assembler called Brick It.
            </p>
          </div>
        </div>
        
        {/* Technical Details Section */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Technical Implementation</h2>
          
          <div className="prose prose-lg max-w-none text-gray-800">
            <h3 className="text-xl font-semibold mb-3">Technology Stack</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Frontend Framework:</strong> React with Vite for fast development and optimal production builds</li>
              <li><strong>Styling:</strong> Tailwind CSS for responsive, utility-first design</li>
              <li><strong>Routing:</strong> React Router for seamless SPA navigation</li>
              <li><strong>3D Visualization:</strong> Three.js for interactive 3D model rendering</li>
              <li><strong>Image Processing:</strong> Canvas API for image manipulation and LEGO color matching</li>
              <li><strong>AI Image Generation:</strong> ONNX Runtime Web for client-side AI processing</li>
              <li><strong>3D Processing:</strong> WebAssembly/Pyodide for complex voxelization algorithms</li>
              <li><strong>Deployment:</strong> Netlify for static hosting and continuous integration</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3">Mosaic Mode Technical Details</h3>
            <p className="mb-4">
              The Mosaic Mode begins with either an AI-generated image or a user upload. The AI generation uses a lightweight ONNX model running entirely in the browser, creating LEGO-inspired images based on text prompts. Once an image is selected, it's processed through our pipeline:
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li>The image is cropped to the user's specifications using the React Easy Crop library</li>
              <li>The cropped image is downscaled to a 16×16 grid, matching our robot's baseplate</li>
              <li>Each pixel is analyzed and matched to the closest available LEGO color using RGB Euclidean distance</li>
              <li>A LEGO stud overlay is applied to visualize the final appearance</li>
              <li>The resulting mosaic data is exportable as a PNG preview and a .txt file containing coordinates and color indices</li>
            </ol>
            
            <h3 className="text-xl font-semibold mb-3">3D Model Mode Technical Details</h3>
            <p className="mb-4">
              The 3D Model Mode handles STL files through a sophisticated voxelization process:
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li>The uploaded STL is parsed using Three.js and converted to a mesh</li>
              <li>A custom voxelization algorithm divides the model into LEGO-sized cubes</li>
              <li>Support structures are automatically added where needed</li>
              <li>The model is rendered in an interactive 3D environment with camera controls</li>
              <li>Users can view the model layer by layer to understand the building process</li>
              <li>The final structure is exportable as a .txt file with 3D coordinates for each brick</li>
            </ol>
            
            <h3 className="text-xl font-semibold mb-3">Robot Integration</h3>
            <p className="mb-6">
              The web app's output formats are specifically designed to be compatible with our EV3 LEGO robot's programming. The robot reads the .txt files and places each brick according to the specified coordinates and color indices, bringing the digital designs into physical reality.
            </p>
          </div>
        </div>
        
        {/* Project Images - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <div className="aspect-square overflow-hidden">
            <img 
              src="/learn1.png" 
              alt="Project Image 1" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <img 
              src="/learn2.png" 
              alt="Project Image 2" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <img 
              src="/learn3.png" 
              alt="Project Image 3" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Project Images - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12">
          <div className="aspect-square overflow-hidden">
            <img 
              src="/learn4.png" 
              alt="Project Image 4" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <img 
              src="/learn5.png" 
              alt="Project Image 5" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <img 
              src="/learn6.png" 
              alt="Project Image 6" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Back to Home Button */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMore; 