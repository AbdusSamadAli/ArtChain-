import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import NET from "vanta/dist/vanta.net.min";

const Layout = ({ children }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          color: 0x1e3a8a, 
          backgroundColor: 0x000000, 
          points: 12,
          maxDistance: 20,
          spacing: 30,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="relative flex flex-col min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
      <Navbar />
      <main className="flex-grow relative z-10 min-h-screen">
        <div
          ref={vantaRef}
          className="absolute top-0 left-0 w-full h-full z-[-1]"
        ></div>
        <div className="container mx-auto py-12 px-6">
          {children}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-400 via-gray-600 to-gray bg-opacity-90 text-white py-6">
        <div className="container mx-auto text-center space-y-2">
          <p className="font-semibold text-lg">
            &copy; 2024 Certificate Integrity System
          </p>
          <p className="text-sm">All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

