const express = require('express'), 
        bodyParser = require('body-parser')

        const app = express()
        const port = 3693

        app.use(bodyParser.json())

        app.post('/api/form', (req,res)=>{
            console.log(req.body)
        })

        app.listen(port, () => {
            console.log('listening on port:', port)
          })
          