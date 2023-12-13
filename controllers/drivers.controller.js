const pool = require('../database')
const addressController = require('./address.controller')

const driversController = {

    // Retornar todos os motoristas.
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(`
                SELECT *
                FROM motorista
            `)

            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)

            res.status(500)
            res.json({
                status: 'error'
            })
        }
    },

    // Encontrar um motorista pela CNH.
    findByCnh: async (req, res) => {
        try {
            const { cnh } = req.params

            const [rows, fields] = await pool.query(`
                SELECT *
                FROM motorista
                WHERE cnh = ?
            `,
            [cnh])

            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)

            res.status(500)
            res.json({
                status: 'error'
            })
        }
    },

    // Encontrar um motorista pela CNH e retornar endereço também.
    findByCnhWithAddress: async (req, res) => {
        try {
            const { cnh } = req.params

            const [rows, fields] = await pool.query(`
                SELECT
                    m.*,
                    e.rua, e.numero, e.complemento, e.bairro, e.cidade, e.estado_id,
                    es.nome AS estado
                FROM motorista AS m
                INNER JOIN endereco AS e
                ON e.id = m.endereco_id
                INNER JOIN estado AS es
                ON es.id = e.estado_id
                WHERE cnh = ?
            `,
            [cnh])

            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)

            res.status(500)
            res.json({
                status: 'error'
            })
        }
    },

    // Adicionar um novo motorista.
    /*
        dataReq = {
            cnh: integer,
            nome: string,
            data_nascimento: string,
            rua: string,
            numero: integer,
            complemento: string,
            bairro: string,
            cidade: string,
            estado_id: integer
        }
    */
    create: async (req, res) => {
        try {
            const dataReq = req.body

            const address = await addressController.create(dataReq)
            if (address == null) {
                throw 'address error'
            }

            const [rows, fields] = await pool.query(`
                INSERT INTO motorista
                (cnh, nome, data_nascimento, endereco_id)
                VALUES
                (?, ?, ?, ?)
            `,
            [
                dataReq.cnh,
                dataReq.nome,
                dataReq.data_nascimento,
                address.insertId
            ])

            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)

            res.status(500)
            res.json({
                status: 'error'
            })
        }
    },

    // Atualizar um motorista.
    /*
        dataReq = {
            cnh: integer,
            nome: string,
            data_nascimento: string,
            endereco_id: integer,
            rua: string,
            numero: integer,
            complemento: string,
            bairro: string,
            cidade: string,
            estado_id: integer
        }
    */
    update: async (req, res) => {
        try {
            const dataReq = req.body

            const addressResult = await addressController.update({
                id: dataReq.endereco_id,
                ...dataReq
            })
            if (!addressResult) {
                throw 'address result error'
            }

            await pool.query(`
                UPDATE motorista
                SET
                    cnh = ?,
                    nome = ?,
                    data_nascimento = ?
                WHERE
                    cnh = ?
            `,
            [
                dataReq.cnh,
                dataReq.nome,
                dataReq.data_nascimento,
                dataReq.cnh
            ])

            res.json({
                data: dataReq
            })
        } catch (error) {
            console.log(error)

            res.status(500)
            res.json({
                status: 'drivers update error'
            })
        }
    }
}

module.exports = driversController