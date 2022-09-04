import Media from '../models/media.model.js';


const read = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        res.send(media);
    }
    catch (err) {
        res.status(500).send(err);
    }

}

export default { 
    read, 
    
};