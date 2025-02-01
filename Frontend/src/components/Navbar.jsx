import { GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Sign-In Successful:", credentialResponse);
    fetch("http://localhost:5000/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: credentialResponse.credential,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login Response:", data);
        localStorage.setItem("token", data.token);
        setIsSignedIn(true);
        alert("Signed in successfully!");
      })
      .catch((err) => {
        console.error("Error during login:", err);
        alert("Login failed!");
      });
  };

  const handleGoogleLoginError = () => {
    console.error("Google Sign-In Failed");
    alert("Sign-In failed. Please try again.");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    alert("Signed out successfully!");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-400 via-gray-600 to-gray bg-opacity-90 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-xl font-bold ml-4 flex items-center space-x-2">
          <img src="/icon.jpeg" alt="Logo" className="w-8 h-8" />
          <a href="/">ArtChain</a>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            {[
              { href: "/chatbot", label: "Chatbot" },
              { href: "/uploadartwork", label: "Upload Artwork" },
              { href: "/generatecertificate", label: "Generate Certificate" },
            ].map(({ href, label }, index) => (
              <a href={href} key={index}>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-900 hover:underline px-4 py-2 rounded transition-all duration-200"
                >
                  {label}
                </motion.button>
              </a>
            ))}
            {!isSignedIn ? (
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              />
            ) : (
              <motion.button
                onClick={handleSignOut}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 px-4 py-2 rounded transition-all duration-200"
              >
                Sign Out
              </motion.button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4 absolute w-1/3 z-10 top-0 right-0 block">
          {[
            { href: "/chatbot", label: "Chatbot" },
            { href: "/uploadartwork", label: "Upload Artwork" },
            { href: "/generatecertificate", label: "Generate Certificate" },
          ].map(({ href, label }, index) => (
            <a href={href} key={index} className="block">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded transition-all duration-200 w-full text-left"
              >
                {label}
              </motion.button>
            </a>
          ))}
          {!isSignedIn ? (
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            />
          ) : (
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white px-4 py-2 rounded transition-all duration-200 w-full"
            >
              Sign Out
            </motion.button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
