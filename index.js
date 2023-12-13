const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200
}

const driversRouter = require('./routes/drivers.router')
const statesRouter = require('./routes/states.router')
const roleRouter = require('./routes/role.router')
const vehicleRouter = require('./routes/vehicle.router')
const policemanRouter = require('./routes/policeman.router')
const addressRouter = require('./routes/address.router')
const infractionRouter = require('./routes/infraction.router')

app.use('/api/motorista', cors(corsOptions), driversRouter)
app.use('/api/estado', cors(corsOptions), statesRouter)
app.use('/api/atuacao', cors(corsOptions), roleRouter)
app.use('/api/veiculo', cors(corsOptions), vehicleRouter)
app.use('/api/agente', cors(corsOptions), policemanRouter)
app.use('/api/endereco', cors(corsOptions), addressRouter)
app.use('/api/infracao', cors(corsOptions), infractionRouter)

app.listen(3000, () => {
    console.log('Servidor funcionando.')
})
