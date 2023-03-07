import { initMongoose } from "../../lib/mongoose";
import { hash, compare} from 'bcryptjs';
import User from "../../models/User";
const jwt = require('jsonwebtoken');


export default async function signup(req, res) {
    if (req.method === 'POST') {
        const {email, password } = req.body;
       
        const user = await User.findOne({email: email});
        compare(password, `${user.password}`, function(err, result) {
       
         if(result === true) {
          const token = jwt.sign({_id: user._id, email: req.body.email}, process.env.TOKEN_SECRET);
          // res.header('auth-token', token);
          res.json({
            status: 0,
            data: {
              name: user.name,
              email: user.email,
              token: token
            },
            err: null,
           });
         }
         res.json({
          status: 1,
          data: {},
          err: 'Invalid email or password'
         });
        });
       
        
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
}
  