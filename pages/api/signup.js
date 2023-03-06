import { initMongoose } from "../../lib/mongoose";
import { hash } from 'bcryptjs';
export default async function signup(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        console.log(name);
        res.json(req.body);
        // ...
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
}
  