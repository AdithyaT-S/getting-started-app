const db = require('../persistence');

module.exports = async (req, res) => {
    const count = await db.getItemCount();
    res.send({ count });
};
