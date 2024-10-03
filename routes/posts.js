const express = require('express')
const mongodbConnector = require('../db/conn')

const router = express.Router();

router.get('/', async (req, res) => {

    const { search = '' } = req.query;
    const searchQuery = search.replace(/[^a-z]/gi, '');

    const db = await mongodbConnector()
    const collection = db.collection('list')

    const pipeline = [];
    pipeline.push({
        $match: {
            $or: [
                { baseForm: { $regex: searchQuery } },
                { pastTense: { $regex: searchQuery } },
                { pastParticiple: { $regex: searchQuery } }
            ]
        }
    });
    pipeline.push({
        $unset: "_id"
    });

    const aggregationResult = await collection
        .aggregate(pipeline)
        .toArray();

    res.status(200).json(aggregationResult)
})

module.exports = router;