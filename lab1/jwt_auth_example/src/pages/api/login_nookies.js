import jwt from 'jsonwebtoken';
import { setCookie } from 'nookies';

const SECRET_KEY = process.env.SECRET_KEY;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      setCookie({ res }, 'auth', token, {
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        path: '/',
        //sameSite: 'strict',
        sameSite: 'lax', // Adjust sameSite attribute
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      });
      return res.status(200).json({ message: 'Login successful' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
