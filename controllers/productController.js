
const { getDocs, collection } = require('firebase/firestore');
const { db } = require('../firebase/firebase');

const getProducts = async (req, res) => {
  const { category } = req.params;

  try {
    const productsCollection = collection(db, category);
    const productsSnapshot = await getDocs(productsCollection);
    const productsData = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(productsData);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getProducts };
