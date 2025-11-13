import express from 'express'
import  EmailRouter  from './src/routes/EmailRouter.js'
import UserRouter from './src/routes/UserRoutes.js'
import LoginRouter from './src/routes/LoginRouter.js'
import CostumerRouter from './src/routes/CustomerRoute.js'
const app = express()
const PORT = 3000
app.use(express.json())
app.use('/send', EmailRouter)
app.use('/users', UserRouter)
app.use('/auth', LoginRouter)
app.use('/costumers', CostumerRouter)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

