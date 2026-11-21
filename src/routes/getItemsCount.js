const db = require('../persistence');

module.exports = async (req, res) => {
    const count = await db.getItemsCount();
    res.send({ count });
};
