import express from 'express'
import  EmailRouter  from './src/routes/EmailRouter.js'
import UserRouter from './src/routes/UserRoutes.js'
const app = express()
const PORT = 3000
app.use(express.json())
app.use('/', EmailRouter)
app.use('/users', UserRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

