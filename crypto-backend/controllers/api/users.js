const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

const addFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        user.favourites.push(req.body.coinName);
        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

function checkToken(req, res) {
  res.json(req.exp);
};

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
};

async function login(req, res) { 
    try { 
        const user = await User.findOne({ email: req.body.email }); 
        if (!user) throw new Error(); 
        const match = await bcrypt.compare(req.body.password, user.password); 
        if (!match) throw new Error();
        const token = createJWT(user);
        res.json(token); 
    } catch (error) { 
        console.log(error)
        res.status(400).json('Bad Credentials'); 
    } 
};

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = {
    addFavorite,
    create,
    login,
    checkToken,
};