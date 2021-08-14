var express = require('express'),
apiRouter = express.Router();

product = require('./product')();
cart = require('./cart')();

apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//===============product api===================
apiRouter.post('/product', product.addProduct);
apiRouter.get('/product', product.getProduct);
apiRouter.get('/product/:id', product.getProductById);

//==============cart api=======================
apiRouter.post('/cart/:productId', cart.postCart);
apiRouter.post('/decreaseCartQuantity/:productId', cart.decreaseCartQuantity);
apiRouter.get('/cart', cart.getCart);
apiRouter.delete('/cart/:id', cart.deleteCart);
apiRouter.get('/find', cart.totalCartPrice);


module.exports = apiRouter;
