var express = require('express'),
apiRouter = express.Router();

product = require('./product')();

apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//===============User api===================
apiRouter.post('/product', product.addProduct);
apiRouter.get('/product', product.getProduct);



module.exports = apiRouter;
