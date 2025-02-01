import { useState, useEffect } from "react";
import axios from "axios";

const CertificateGenerator = () => {
  const [artworks, setArtworks] = useState([]); 
  const [certificateLink, setCertificateLink] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token missing");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/artworks/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setArtworks(response.data);
        } else if (Array.isArray(response.data.artworks)) {
          setArtworks(response.data.artworks); 
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching artworks:", err);
        setError("Failed to fetch artworks");
      }
    };

    fetchArtworks();
  }, []);
  const handleGenerateCertificate = async (artworkId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/certificate/ownership-proof/${artworkId}`
      );

      if (response.data && response.data.certificateUrl) {
        setCertificateLink(response.data.certificateUrl);
        setMessage("Certificate generated successfully!");
      } else {
        setError("Error generating certificate.");
      }
    } catch (error) {
      console.error("Error generating certificate:", error);
      setError("Failed to generate certificate.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Generate Certificate for Artwork
      </h2>

      {error && <p className="text-red-600">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}
      {artworks.length > 0 ? (
        artworks.map((artwork) => (
          <div key={artwork._id} className="p-4 border rounded-lg mb-4 bg-white">
            <h3 className="font-bold text-lg text-black">{artwork.title}</h3>
            <p className="text-black">{artwork.description}</p>
            <button
              onClick={() => handleGenerateCertificate(artwork._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Generate Certificate
            </button>
          </div>
        ))
      ) : (
        <p className="text-white">No artworks available</p>
      )}

      {certificateLink && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md text-green-600">
          <p>
            Certificate generated:{" "}
            <a
              href={certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              Download Certificate
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
