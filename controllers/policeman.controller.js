const pool = require('../database')

const policemanController = {

    // Encontrar um agente pelo número de identificação.
    findByNum: async (req, res) => {
        try {
            const { num } = req.params

            const [rows, fields] = await pool.query(`
                SELECT 
                    ag.*,
                    at.nome AS atuacao
                FROM agente AS ag
                INNER JOIN atuacao AS at
                ON at.id = ag.atuacao_id
                WHERE ag.num = ?
            `,
            [num])

            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)

            res.status(500)
            res.send({
                status: 'error'
            })
        }
    },

    // Encontrar um agente pelo nome.
    findByNome: async (req, res) => {
        try {
            const { nome } = req.params
            const nomeParam = '%'+ nome + '%'

            const [rows, fields] = await pool.query(`
                SELECT 
                    ag.*,
                    at.nome AS atuacao
                FROM agente AS ag
                INNER JOIN atuacao AS at
                ON at.id = ag.atuacao_id
                WHERE ag.nome LIKE ?
            `,
            [nomeParam])

            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)

            res.status(500)
            res.send({
                status: 'error'
            })
        }
    },

    // Criar um novo agente.
    /*
        dataReq = {
            num: integer,
            nome: string,
            atuacao_id: integer
        }
    */
    create: async (req, res) => {
        try {
            const { data } = req.body
            const dataReq = JSON.parse(data)

            const [rows, fields] = await pool.query(`
                INSERT INTO agente
                (num, nome, atuacao_id)
                VALUES
                (?, ?, ?)
            `,
            [
                dataReq.num,
                dataReq.nome,
                dataReq.atuacao_id
            ])

            res.json({
                data: dataReq
            })
        } catch(error) {
            console.log(error)

            res.status(500)
            res.json({
                status: 'error'
            })
        }
    },

    // Atualizar um agente.
    /*
        dataReq = {
            num: integer,
            nome: string,
            atuacao_id: integer
        }
    */
    update: async (req, res) => {
        try {
            const { num } = req.params

            const { data } = req.body
            const dataReq = JSON.parse(data)

            const [rows, fields] = await pool.query(`
                UPDATE agente
                SET num = ?, nome = ?, atuacao_id = ?
                WHERE num = ?
            `,
            [
                dataReq.num,
                dataReq.nome,
                dataReq.atuacao_id,
                num
            ])

            dataReq.num = num

            res.json({
                data: dataReq
            })
        } catch(error) {
            console.log(error)

            res.status(500)
            res.json({
                status: 'error'
            })
        }
    }
}

module.exports = policemanController