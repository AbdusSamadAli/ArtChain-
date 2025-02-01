import { useState, useEffect } from "react";
import axios from "axios";

const UploadArtwork = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [artworks, setArtworks] = useState([]);
  const [blockchainMessage, setBlockchainMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArtworks = async () => {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/artworks/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtworks(response.data.artworks);
      } catch (error) {
        console.error(
          "Error fetching artworks:",
          error.response ? error.response.data : error.message
        );
        setError("Error fetching artworks.");
      }
    };

    fetchArtworks();
  }, [token]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleUpload = async (event) => {
    event.preventDefault();

    if (!token) {
      setError("You must be signed in to upload artwork.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/artworks/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Artwork uploaded:", response.data);
      setMessage("Artwork uploaded successfully!");
      setBlockchainMessage(response.data.blockchainMessage);
      setTitle("");
      setDescription("");
      setFile(null);

      const fetchResponse = await axios.get(
        "http://localhost:5000/artworks/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArtworks(fetchResponse.data.artworks);
    } catch (error) {
      console.error(
        "Error uploading artwork:",
        error.response ? error.response.data : error.message
      );
      setError("Error uploading artwork. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (artworkId) => {
    if (!token) {
      setError("You must be signed in to delete artwork.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/artworks/${artworkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArtworks(artworks.filter((artwork) => artwork._id !== artworkId));
      setMessage("Artwork deleted successfully.");
    } catch (error) {
      console.error(
        "Error deleting artwork:",
        error.response ? error.response.data : error.message
      );
      setError("Error deleting artwork. Please try again.");
    }
  };

  return (
    <div className="relative bg-transparent">
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 mt-9 sm:max-w-lg md:max-w-2xl">
        <h2 className="text-xl font-bold flex items-center justify-center">
          Upload Artwork
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded text-black"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded text-black"
        ></textarea>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border p-2"
        />

        {file && <p className="text-sm text-gray-500">Selected: {file.name}</p>}
        {file && file.type === "application/pdf" && (
          <iframe
            src={URL.createObjectURL(file)}
            width="100%"
            height="400"
            className="mt-2"
          ></iframe>
        )}

        {file &&
          (file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.type === "application/msword") && (
            <iframe
              src={`https://docs.google.com/viewer?url=${URL.createObjectURL(
                file
              )}&embedded=true`}
              width="100%"
              height="400"
              className="mt-2"
            ></iframe>
          )}
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
        {message && (
          <p className="text-center text-sm text-green-600">{message}</p>
        )}

        {blockchainMessage && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-md text-yellow-600">
            <p>{blockchainMessage}</p>
          </div>
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block mx-auto"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
      <div className="max-w-md mx-auto p-3 bg-gray-100 rounded-xl mt-9 sm:max-w-lg md:max-w-2xl">
        <h3 className="text-lg font-semibold text-black flex items-center justify-center">
          {" "}
          Uploaded Artworks
        </h3>
        <div className="space-y-4 flex items-center justify-center">
          {artworks.length > 0 ? (
            artworks.map((artwork) => (
              <div
                key={artwork._id}
                className="p-4 ml-3 mr-3 mb-3 border rounded-lg bg-white shadow-md"
              >
                <h4 className="font-bold text-black">{artwork.title}</h4>
                <p className="text-black">{artwork.description}</p>
                <p className="text-sm text-gray-500">
                  Uploaded by: {artwork.owner ? artwork.owner.name : "Unknown"}
                </p>
                {artwork.filePath && (
                  <a
                    className="hover:underline"
                    href={`http://localhost:5000/${artwork.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Artwork
                  </a>
                )}
                <button
                  onClick={() => handleDelete(artwork._id)}
                  className="mt-2 ml-3 text-red-600 hover:text-red-800 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-black">No artworks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadArtwork;
