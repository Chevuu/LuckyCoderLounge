const { CoinXPModel } = require('../models/CoinXpModel');

// Controller function for retrieving coins and XP by user ID
async function getCoinsAndXPByUserId(req, res) {
  const userId = req.params.userId;

  try {
    const coinXP = await CoinXPModel.findOne({ userID: userId });

    if (!coinXP) {
      return res.status(404).send({ error: 'Coin and XP data not found' });
    }

    res.status(200).send(coinXP);
  } catch (error) {
    console.error('Error retrieving coins and XP:', error);
    res.status(500).send(error);
  }
}

// Controller function for updating coins and XP by user ID
async function updateCoinsAndXPByUserId(req, res) {
  const userId = req.params.userId;
  const { coinCount, xpCount } = req.body;

  try {
    let coinXP = await CoinXPModel.findOne({ userID: userId });

    if (!coinXP) {
      coinXP = new CoinXPModel({ userID: userId, coinCount, xpCount });
    } else {
      coinXP.coinCount = coinXP.coinCount + coinCount;
      coinXP.xpCount = coinXP.xpCount + xpCount;
    }

    await coinXP.save();

    res.status(200).send(coinXP);
  } catch (error) {
    console.error('Error updating coins and XP:', error);
    res.status(500).send(error);
  }
}

module.exports = { getCoinsAndXPByUserId, updateCoinsAndXPByUserId };
