const Cart = require("../models/cart");


module.exports = () => {

 //==============Add to cart=============================================================
 async function postCart(req,res){
    var return_response = {
        "status": null,
        "message": null,
        "data": null
    } 
    try {
        opt = extend({},req.body);
        var cart = new Cart(opt); 
        cart.save(function(error,doc){
            if(error) {
                return_response["status"] = 400;
                return_response["message"] = String(error);
                return res.json(return_response);;
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

 //====================get cart==========================================================
 async function getCart(req,res){
    var return_response = {
        "status": null,
        "message": null,
        "data": null
    }
    try{
        Cart.find({}).populate("product").exec(function(error,doc){
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
        var cart = await Cart.findOne({user:req.user.id});
        if(cart){
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
        } else {
            return_response["status"] = 400;
            return_response["message"] = "Invalid Cart";
            return res.json(return_response);
        }
    }catch (error) {
        return_response["message"] = String(error);
        return res.status(400).json(return_response);
    }
}




    return {
        postCart,
        getCart,
        deleteCart
    }

}