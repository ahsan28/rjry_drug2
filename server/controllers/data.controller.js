import Data from '../models/data.model.js';
import Media from '../models/media.model.js';
import User from '../models/users.model.js';


// create a new data
const create = async (req, res) => {
    try {
        console.log('create data');
        const media = await Media.create({
            title: 'demo',
            description: 'demo',
            url: 'demo',
            type: 'image'
        });
        const user = await User.create({
            name: 'demo',
            email: 'demo',
            password: 'demo'
        });
        const data = await Data.create({
            title: 'demo',
            description: 'demo',
            lastEditDate: new Date(),
            lastEditor: user._id,
            cover: media._id,
            media: [media._id]
        });
        res.send({ data, media, user });
        
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

export default { 
    create,
    getAll, 
    
};