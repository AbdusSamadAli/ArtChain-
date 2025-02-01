import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => {
  return (
    <div className="relative max-w-7xl mx-auto px-6 py-12 text-white">
      <header className="relative text-center mb-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={0}
        >
          Welcome to ArtChain: The Future of Digital Art Ownership
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={1}
        >
          A decentralized platform to showcase and upload artworks with
          blockchain-based certification.
        </motion.p>
      </header>

      <section className="text-center mb-12">
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={2}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={3}
        >
          ArtChain leverages blockchain technology to provide transparent
          ownership, provenance and authenticity for digital art. Upload your
          artwork, generate an immutable record on the blockchain and create a
          verifiable certificate of ownership.
        </motion.p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center relative z-10">
        {[
          "Sign in with Google",
          "Upload Your Digital Artwork",
          "Generate Ownership Proof Certificate",
          "Interact with AI Chatbot",
        ].map((title, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-800 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={textVariant}
            custom={index + 4}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-300">
              {index === 0
                ? "Authenticate securely with your Google account to get started."
                : index === 1
                ? "Easily upload your digital artwork to be stored securely on the blockchain."
                : index === 2
                ? "Every artwork receives a blockchain-based certificate proving ownership."
                : "Chat with our AI assistant to learn more about blockchain and metadata storage."}
            </p>
          </motion.div>
        ))}
      </section>

      <section className="text-center mt-12">
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={8}
        >
          Why Blockchain?
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={9}
        >
          Blockchain technology guarantees that artwork metadata is immutable,
          ensuring that the details of your artwork—such as creation date,
          ownership and transaction history—remain unaltered. This transparency
          helps combat art fraud and secures digital assets.
        </motion.p>
      </section>

      <section className="text-center mt-12">
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold mb-6"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={10}
        >
          Digital Artwork Showcase
        </motion.h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-6">
          Explore stunning digital artworks that demonstrate the potential of
          blockchain-secured ownership.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              src: "/images.jpeg",
              title: "Ethereal Visions",
              description:
                "A surreal composition with blockchain-stamped authenticity.",
            },
            {
              src: "/image2.jpg",
              title: "Future Landscapes",
              description:
                "A futuristic artwork showcasing the blend of technology and creativity.",
            },
            {
              src: "/image3.jpeg",
              title: "Abstract Dimensions",
              description:
                "A unique generative art piece stored immutably on the blockchain.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              <img
                src={item.src}
                alt={item.title}
                className="rounded-lg w-full h-64 object-cover"
              />
              <h3 className="text-xl font-bold mt-4">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
