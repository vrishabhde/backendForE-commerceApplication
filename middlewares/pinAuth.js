import Users from "../models/register.js";
import encrypt from 'encryptjs';


export const addproductAuth = async (req, res, next) => {
    try {
        const { id, pin } = req.body;

        const secretkey = 'vrushabh';

        const response = await Users.find({ _id: id }).exec();

        const decipherForPin = encrypt.decrypt(response[0].pin, secretkey, 256);

        if (decipherForPin == pin) {
            if (response[0].role == "seller") {

                next();

            } else {
                return res.send("only seller can add products");
            }
        } else {
            return res.send("incorrect pin");
        }

    } catch (err) {
        return res.send(err);
    }
}  

export const authForGetAllproduct = async (req, res, next) => {
    try{
        const {id, pin} = req.body;
        const secretkey = 'vrushabh';

        const response = await Users.find({_id:id}).exec();

        const decipherForPin = encrypt.decrypt(response[0].pin, secretkey, 256);

        if (decipherForPin === pin){
            if(response[0].role == "buyer"){
                next();
                
            }else{
                return res.send("only buyer can get all");
            }
        }else{
            return res.send("incorrect pin")
        }
    }catch(err){
        return res.send(err);
    }
}
export const updateProductAuth = async (req,res,next) => {
    try{

        const {_id, pin} = req.body;
        const response = await Users.find({_id}).exec();
        if(!response.length) return res.send("user not found");

        const secretkey = 'vrushabh';
        const decipherForPin = encrypt.decrypt(response[0].pin, secretkey, 256);
        if (decipherForPin == pin) {
            if(response[0].role == "seller"){
                next();
                
            }else{
                return res.send("you are not allowed to update products")
            }
        }else{
            return res.send("incorrect pin");
        }

    }catch(err){
        return res.send(err);
    }
}


export const deleteProductAuth = async (req, res, next) => {
    try{
        const { _id, pin} = req.body;
        const response = await Users.find({_id}).exec();
        if(response[0].role != "admin") return res.send("only admin can delete the products");
        const secretkey = 'vrushabh';
        const decipherForPin = encrypt.decrypt(response[0].pin, secretkey, 256);
        if(decipherForPin != pin) return res.send("incorrect pin");
        next();
        
       
    }catch(err){
        return res.send(err);
    }
}