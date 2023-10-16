const db = require('../config/db.js');
const initModels = require("../models/init-models");
const models = initModels(db);

const getUsers = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = {};

        if (id) {
            whereCondition.id = id;
        }

        const response = await models.user.findAll({
            where: whereCondition,
            attributes: ['id', 'name', 'email', 'gender'],
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const body = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
        }
        const response = await models.user.create(body);
        res.status(201).json({ msg: "success", response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const updateUser = async (req, res) => {
    const user = await models.user.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const body = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
        division_id: req.body.division_id,
    }

    try {
        await models.user.update(body, {
            where: {
                id: req.query.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const deleteUser = async (req, res) => {
    const user = await models.user.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    try {
        await models.user.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = { getUsers, createUser, updateUser, deleteUser }