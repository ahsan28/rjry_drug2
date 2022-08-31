import Media from '../models/media.model.js';


const getAll = async (req, res) => {
    try {
        const media = await Media.find({});
        res.send(media);
    }
    catch (err) {
        res.status(500).send(err);
    }

}

export default { 
    getAll, 
    
};