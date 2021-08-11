const Product = require("../models/product");


module.exports = () => {

    //================Add Product=======================================================
    async function addProduct(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            let opt = req.body;
            opt.user = req.user.id;
            const product = new Product(opt);
            const doc = await product.save();
            return_response.status = 200;
            return_response.message = "Product added successfully";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }




    return {
        addProduct,
    }

}