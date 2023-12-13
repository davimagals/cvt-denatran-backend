const pool = require('../database')

const infractionController = {

    // Retornar todas as infrações.
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(`
                SELECT
                    inf.*,
                    e.rua, e.numero AS numero_end, e.complemento, e.bairro, e.cidade,
                    es.nome AS estado,
                    v.marca, v.modelo, v.ano,
                    m.nome, m.data_nascimento
                FROM infracao AS inf
                INNER JOIN endereco AS e
                ON e.id = inf.endereco_id
                INNER JOIN estado AS es
                ON es.id = e.estado_id
                INNER JOIN veiculo AS v
                ON v.placa = inf.veiculo_placa
                INNER JOIN motorista AS m
                ON m.cnh = inf.motorista_cnh
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

    // Encontrar uma infração pelo número de identificação.
    findByNum: async (req, res) => {
        try {
            const { num } = req.params

            const [rows, fields] = await pool.query(`
                SELECT *
                FROM infracao
                WHERE numero = ?
            `,
            [num])

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

    // Retornar todas as infrações de um motorista pela CNH.
    findByCnh: async (req, res) => {
        try {
            const { cnh } = req.params

            const [rows, fields] = await pool.query(`
                SELECT
                    inf.*,
                    e.rua, e.numero AS numero_end, e.complemento, e.bairro, e.cidade,
                    es.nome AS estado,
                    v.marca, v.modelo, v.ano,
                    m.nome, m.data_nascimento
                FROM infracao AS inf
                INNER JOIN endereco AS e
                ON e.id = inf.endereco_id
                INNER JOIN estado AS es
                ON es.id = e.estado_id
                INNER JOIN veiculo AS v
                ON v.placa = inf.veiculo_placa
                INNER JOIN motorista AS m
                ON m.cnh = inf.motorista_cnh
                WHERE inf.motorista_cnh = ?
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
    }
}

module.exports = infractionController