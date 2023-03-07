import { initMongoose } from "../../lib/mongoose";
import { hash } from 'bcryptjs';
import User from "../../models/User";

export default async function signup(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        await initMongoose();
        User.db.inser
        res.json(await User.insertMany({
          name: name,
          email: email,
          password: hashedPassword,
        }));
        
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
}
  