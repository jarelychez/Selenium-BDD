import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the auth cookie
    res.setHeader('Set-Cookie', serialize('auth', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
    }));
    return res.status(200).json({ message: 'Logout successful' });
  } else if (req.method === 'GET') {
    // Handle GET request to read the cookie
    const { auth } = req.cookies;
    if (auth) {
      return res.status(200).json({ auth });
    } else {
      return res.status(404).json({ message: 'No auth cookie found' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
