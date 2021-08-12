const Cart = require("../models/cart");
const Product = require("../models/product");


module.exports = () => {

 //==============Add to cart=============================================================
 async function postCart(req,res){
    var return_response = { "status": null, "message": null, "data": {} } 
    try {
        let opt = req.body;
        let cartData = await Cart.findOne({product:req.params.productId})
        if(cartData && cartData.product == req.params.productId){
            cartData.quantity += opt.quantity
            await cartData.save()
            return_response.data = cartData;

        }else {
            opt.product = req.params.productId
            const cart = new Cart(opt);
            const doc = await cart.save();  
            return_response.data = doc;  
        }
        return_response.status = 200;
        return_response.message = "Product added successfully";
    } catch (error) {
        return_response.status = 400;
        return_response.message = String(error);
    }
    res.json(return_response);
}

 //====================get cart==========================================================
 async function getCart(req,res){
    var return_response = {
        "status": null,
        "message": null,
        "data": null
    }
    try{
        Cart.find({}).exec(function(error,doc){
            if(error){
                return_response["status"] = 400;
                return_response["message"] = String(error);
                return res.json(return_response);
            } else {
                return_response["status"] = 200;
                return_response["message"] = "success";
                return_response["data"] = doc;
                return res.json(return_response);
            }
        })
    } catch (error) {
        return_response["message"] = String(error);
        return res.status(400).json(return_response);
    }
}


 //================delete cart===========================================================
 async function deleteCart(req,res){
    var return_response = {
        "status": null,
        "message": null,
        "data": null
    }
    try{
            Cart.findByIdAndDelete({_id:req.params.id}).exec(function(error,doc){
                if(error){
                    return_response["status"] = 400;
                    return_response["message"] = String(error);
                    return res.json(return_response);
                } else {
                    return_response["status"] = 200;
                    return_response["message"] = "success";
                    return_response["data"] = doc;
                    return res.json(return_response);

                }
            })
    }catch (error) {
        return_response["message"] = String(error);
        return res.status(400).json(return_response);
    }
}

    //==================total cart price=================================================
    async function totalCartPrice(req,res){
        var return_response = { "status": null, "message": null, "totalPrice": null } 
        try {
            let totalPrice = 0;
            const cart = await Cart.find({}).populate('product');
            //const cartObj = cart.toObject();
            for(let i=0;i<cart.length;i++){
                var opt = cart[i]._doc
                const product = await Product.findOne({_id:opt.product._id});
                var price = opt.quantity * product._doc.price
                totalPrice = totalPrice + price;
            }
            return_response.status = 200;
            return_response.message = "Success";
            return_response.totalPrice = totalPrice;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }



    return {
        postCart,
        getCart,
        deleteCart,
        totalCartPrice
    }

}