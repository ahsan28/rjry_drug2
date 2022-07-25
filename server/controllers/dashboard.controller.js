import User from '../models/users.model.js';
import Entry from '../models/entry.model.js';
import Contract from '../models/contract.model.js';
import Property from '../models/property.model.js';


const stats = async (req, res) => {
    try {
        const year = req.params.year;
        const entries = await Entry.find({ year: year });

    }
    catch (err) {
        res.status(500).send(err);
    }

}

export default { 
    stats, 
    
};