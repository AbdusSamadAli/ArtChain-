
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'; 
import Home from './components/Home';
import AiPage from './components/ai';
import UploadArtwork from './components/ArtworkUpload';
import GenerateCertificatePage from './components/CertificateGenerator';
import '../src/index.css'; 
import "font-awesome/css/font-awesome.min.css";
function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Layout> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<AiPage />} />
            <Route path="/uploadartwork" element={<UploadArtwork />} />
            <Route path="/generatecertificate" element={<GenerateCertificatePage />} />
          </Routes>
        </Layout>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
