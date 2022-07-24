import Entry from '../models/entry.model.js';

const get = async (req, res) => {
    try {
        const id = req.params.id;
        const entry = await Entry.findById(id);
        res.json(entry);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getAll = async (req, res) => {
    try {
        const entries = await Entry.find({});
        res.send(entries);
    } catch (err) {
        res.status(500).send(err);
    }
}

const create = async (req, res) => {
    try {
        const entry = new Entry(req.body);
        await entry.save();
        res.send(entry);
    } catch (err) {
        res.status(500).send(err);
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const entry = await Entry.findByIdAndUpdate(id, req.body, { new: true });
        res.send(entry);
    } catch (err) {
        res.status(500).send(err);
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await Entry.findByIdAndRemove(id);
        res.send(`Entry with id ${id} was deleted`);
    } catch (err) {
        res.status(500).send(err);
    }
}

export default { 
    get,
    getAll, 
    create,
    update,
    remove,
};