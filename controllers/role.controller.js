const pool = require('../database')

const roleController = {

    // Retornar todas as atuações (cargos) de agentes de trânsito.
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(`
                SELECT *
                FROM atuacao
            `)

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
    }
}

module.exports = roleController