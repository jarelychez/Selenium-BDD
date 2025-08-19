import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET_KEY = process.env.SECRET_KEY;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    // Replace with your actual user validation logic
    if (username === USERNAME && password === PASSWORD) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      
      res.setHeader('Set-Cookie', serialize('auth', token, {
        httpOnly: false, //set to false so works on client
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        path: '/',
        sameSite: 'strict', // Adjust as needed: 'strict', 'lax', or 'none'
      }));
      
      return res.status(200).json({ message: 'Login successful' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
