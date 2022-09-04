import Data from '../models/data.model.js';
import Media from '../models/media.model.js';
import User from '../models/users.model.js';
// const ObjectId = require("mongodb").ObjectId;
import { ObjectId } from 'mongodb';


// create a new data for database
const create = async (req, res) => {
    try {
        const media = await Media.create({
            _id: "100000000000000000000000",
            title: 'demo',
            description: 'demo',
            url: 'demo',
            type: 'image'
        });
        const user = await User.create({
            _id: "200000000000000000000000",
            name: 'demo',
            email: 'demo',
            password: 'demo'
        });
        const data = await Data.create({
            _id: "300000000000000000000000",
            title: 'demo',
            description: 'demo',
            lastEditDate: new Date(),
            lastEditor: "200000000000000000000000",
            cover: "100000000000000000000000",
            media: ["100000000000000000000000"]
        });
        res.send({ data, media, user });
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const read = async (req, res) => {
    try {
        const data = await Data.findOne({ title: req.params.title })
            // .populate([
            //     { path: 'cover' },
            //     { path: 'media' }
            // ])
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Data.find({});
        res.send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const update = async (req, res) => {
    try {
        
        if (req.body.title == 'gallery'){
            if (!req.body.gallery) req.body.gallery = []
            let imagesToSave = req.body.gallery.map((image) => !image.saved)||[]
            let newImageIds = imagesToSave.map(() => new ObjectId())
            imagesToSave = imagesToSave.map((image, index) => {
                image._id = newImageIds[index]
                return image
            })
            await Media.insertMany(imagesToSave).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
            req.body.gallery = [...req.body.gallery, ...newImageIds]
        }

        if (req.body.cover && !req.body.cover.saved){
            let newImageId = new ObjectId()
            req.body.cover._id = newImageId
            await Media.create(req.body.cover).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
            req.body.cover = newImageId
        }

        const data = await Data.findOneAndUpdate({ title: req.params.title }, req.body, { new: true, upsert: true })
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export default { 
    read,
    create,
    getAll, 
    update,
};