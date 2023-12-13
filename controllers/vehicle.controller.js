const pool = require('../database')

const vehicleController = {

    // Encontrar um veículo pela placa.
    findByPlate: async (req, res) => {
        try {
            const { placa } = req.params

            const [rows, fields] = await pool.query(`
                SELECT *
                FROM veiculo
                WHERE placa = ?
            `,
            [placa])

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

    // Criar um novo veículo.
    /*
        dataReq = {
            placa: string,
            marca: string,
            modelo: string,
            ano: year
        }
    */
    create: async (req, res) => {
        try {
            const { data } = req.body
            const dataReq = JSON.parse(data)

            const [rows, fields] = await pool.query(`
                INSERT INTO veiculo
                (placa, marca, modelo, ano)
                VALUES
                (?, ?, ?, ?)
            `,
            [
                dataReq.placa,
                dataReq.marca,
                dataReq.modelo,
                dataReq.ano
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

    // Editar veículo.
    /*
        dataReq = {
            placa: string,
            marca: string,
            modelo: string,
            ano: year
        }
    */
    update: async (req, res) => {
        try {
            const { placa } = req.params

            const { data } = req.body
            const dataReq = JSON.parse(data)

            const [rows, fields] = await pool.query(`
                UPDATE veiculo
                SET placa = ?, marca = ?, modelo = ?, ano = ?
                WHERE placa = ?
            `,
            [
                dataReq.placa,
                dataReq.marca,
                dataReq.modelo,
                dataReq.ano,
                placa
            ])

            dataReq.placa = placa

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

module.exports = vehicleController