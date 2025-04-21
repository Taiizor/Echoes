import type { NextApiRequest, NextApiResponse } from 'next';
import quotes from '@/data/quotes.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set content type header for JSON responses
  res.setHeader('Content-Type', 'application/json');
  
  // HTTP method check
  if (req.method !== 'GET') {
    return res.status(405).send(JSON.stringify({ 
      error: 'Method Not Allowed', 
      message: `The '${req.method}' method is not supported for this endpoint` 
    }, null, 2));
  }
  
  // Successful response with formatted JSON
  res.status(200).send(JSON.stringify(quotes, null, 2));
} 