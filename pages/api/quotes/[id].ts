import type { NextApiRequest, NextApiResponse } from 'next';
import quotes from '@/data/quotes.json';
import { Quote } from '@/hooks/useQuotes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const quoteId = parseInt(id as string, 10);
  
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Set content type header for JSON responses
  res.setHeader('Content-Type', 'application/json');
  
  // Respond immediately for OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // HTTP method check
  if (req.method !== 'GET') {
    return res.status(405).send(JSON.stringify({ 
      error: 'Method Not Allowed', 
      message: `The '${req.method}' method is not supported for this endpoint` 
    }, null, 2));
  }
  
  // ID validation check
  if (isNaN(quoteId)) {
    return res.status(400).send(JSON.stringify({ 
      error: 'Invalid ID Format', 
      message: 'ID must be a number' 
    }, null, 2));
  }
  
  const quote = quotes.find((q: Quote) => q.id === quoteId);
  
  // Resource not found check
  if (!quote) {
    return res.status(404).send(JSON.stringify({ 
      error: 'Quote Not Found', 
      message: `No quote exists with ID: ${quoteId}` 
    }, null, 2));
  }
  
  // Successful response with formatted JSON
  res.status(200).send(JSON.stringify(quote, null, 2));
} 