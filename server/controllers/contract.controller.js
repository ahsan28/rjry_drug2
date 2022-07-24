import User from '../models/entry.model.js';


const getAll = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(500).send(err);
    }

}

export default { 
    getAll, 
    
};