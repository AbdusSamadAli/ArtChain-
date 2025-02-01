const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { sub, email, name } = ticket.getPayload();
    let user = await User.findOne({ googleId: sub });
    
    if (!user) {
      user = await User.create({ googleId: sub, email, name });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ token: jwtToken, user });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(400).json({ error: "Invalid token or user authentication failed" });
  }
};

module.exports = { googleSignIn };
