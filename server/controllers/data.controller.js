import Data from '../models/data.model.js';


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
    getAll, 
    
};