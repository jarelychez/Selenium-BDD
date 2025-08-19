import { destroyCookie } from 'nookies';

export default function handler(req, res) {
  if (req.method === 'POST') {
    destroyCookie({ res }, 'auth', {
      path: '/',
    });
    return res.status(200).json({ message: 'Logout successful' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
