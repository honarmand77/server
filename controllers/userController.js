const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // ...
});

const UserModel = mongoose.model('users', userSchema);

const getUserData = async (req, res) => {
  try {
    const userData = await UserModel.findOne({ _id });

    if (!userData) {
      return res.status(404).json({ message: 'کاربر یافت نشد' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'خطا در بازیابی اطلاعات کاربر' });
  }
};

module.exports = { getUserData };
