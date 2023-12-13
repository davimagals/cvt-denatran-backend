const pool = require('../database')

const statesController = {

    // Retornar todos os estados do Brasil.
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(`
                SELECT *
                FROM estado
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

module.exports = statesController