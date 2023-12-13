const pool = require('../database')

const addressController = {

    // Inserir novo endereço.
    /*
        address = {
            rua: string,
            numero: integer,
            complemento: string,
            bairro: string,
            cidade: string,
            estado_id: integer
        }
    */
    create: async (address) => {
        try {
            const [rows, fields] = await pool.query(`
                INSERT INTO endereco
                (rua, numero, complemento, bairro, cidade, estado_id)
                VALUES
                (?, ?, ?, ?, ?, ?)
            `,
            [
                address.rua,
                address.numero,
                address.complemento,
                address.bairro,
                address.cidade,
                address.estado_id
            ])

            return rows
        } catch(error) {
            return null
        }
    },

    // Atualizar um endereço existente.
    /*
        address = {
            id: integer,
            rua: string,
            numero: integer,
            complemento: string,
            bairro: string,
            cidade: string,
            estado_id: integer
        }
    */
    update: async (address) => {
        try {
            const [rows, fields] = await pool.query(`
                UPDATE endereco
                SET
                    rua = ?,
                    numero = ?,
                    complemento = ?,
                    bairro = ?,
                    cidade = ?,
                    estado_id = ?
                WHERE
                    id = ?
            `,
            [
                address.rua,
                address.numero,
                address.complemento,
                address.bairro,
                address.cidade,
                address.estado_id,
                address.id
            ])

            return rows
        } catch(error) {
            console.log(error)
            return null
        }
    },

    // Encontrar um endereço pelo ID.
    findById: async (req, res) => {
        try {
            const { id } = req.params

            const [rows, fields] = await pool.query(`
                SELECT
                    en.*,
                    es.nome AS estado
                FROM endereco AS en
                INNER JOIN estado AS es
                ON es.id = en.estado_id
                WHERE en.id = ?
            `,
            [id])

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

module.exports = addressController