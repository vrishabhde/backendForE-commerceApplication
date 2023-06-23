import Users from "../models/register.js";
import encrypt from 'encryptjs';
import axios from "axios";


export const register = async (req, res) => {
    try{
        const { role, email, password, pin} = req.body;

        if(!role) return res.send("role is require");
        if(!email) return res.send("email is require");
        if(!password) return res.send("password is require");
        if(!pin) return res.send("pin is require");

        const response = await Users.find({email}).exec();
        if(response.length) return res.send("user already exist");

        const secretkey = 'vrushabh';
        const plaintextForPassword = password;
        const plaintextForPin = pin;

        const ciphertextForPassword = encrypt.encrypt(plaintextForPassword, secretkey, 256);

        const ciphertextForPin = encrypt.encrypt(plaintextForPin, secretkey, 256);

        const user = new Users({
            role: role,
            email: email,
            password: ciphertextForPassword,
            pin: ciphertextForPin
        });

        await user.save();

        return res.send("registration success");

    }catch(err){
        return res.send(err);
    }
}





