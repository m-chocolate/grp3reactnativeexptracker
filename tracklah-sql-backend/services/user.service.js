require('dotenv').config({ debug: true });
const {User} = require('../model/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const userServices = {
    create: async function (userData){
        let results = {
            message:null,
            status:null,
            data:null
        };

        const {username, password, name, email} = userData;

        let user = await User.findByPk(username);
        
        if(user != null){
            results.status = 403;
            results.message = 'Username already exists.'
            return results;
        };

        user = await User.findOne({where:{email}});

        if(user != null){
            results.status = 403;
            results.message = 'Email already exists.'
            return results;
        };


        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        try{
            const newUser = await User.create({
                hashedPassword:hashedPassword,
                username,
                name,
                email
            });

            results.status = 201;
            results.message = `User ${newUser.username} created.`
            results.data = {
                username:newUser.username,
                email:newUser.email,
            }

        }catch(err){
            results.status = 500;
            results.message = err;
            console.log(err);

        };

        return results;
    },

    login: async function (credentials){

        let results = {
            message:null,
            status:null,
            jwtToken:null,
        };

        const {username, email, password} = credentials;

        let existingUser;

        if (username){
            existingUser = await User.findByPk(username);
        } else if (email){
            existingUser = await User.findOne({where:{email}});
        };

        if (!existingUser){
            results.status = 401,
            results.message = "Log in failed due to invalid user.";
            return results;
        };

        let passwordVerified = await bcrypt.compare(password, existingUser.hashedPassword);

        if(!passwordVerified){
            results.status = 401;
            results.message = "Log in failed due to invalid password.";
            return results;
        };

        let token;

        try{
            token = jwt.sign({
                username:existingUser.username,
                mongoId: existingUser.mongoId,
            }, jwtSecret,{expiresIn: "30 days"})

        } catch(err){
            console.log(err);
            results.status = 500;
            results.message = err;
            return results
        }

        let decoded = jwt.decode(token);

        results.status = 201;
        results.message = "Log in successful";
        results.jwtToken = token;
        results.jwtExpires = new Date(decoded.exp*1000);

        return results;


    }
}

module.exports = userServices;