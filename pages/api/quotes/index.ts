import type { NextApiRequest, NextApiResponse } from 'next';
import quotes from '@/data/quotes.json';

type Quote = {
  id: number;
  lang: string;
  author: string;
  quote: string;
};

type PaginatedResponse = {
  data: Quote[];
  pagination: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
  
  // Pagination parameters from query string
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;
  
  // Input validation
  if (page < 1 || perPage < 1 || perPage > 100) {
    return res.status(400).send(JSON.stringify({
      error: 'Bad Request',
      message: 'Invalid pagination parameters. Page number must be at least 1, and quotes per page must be between 1 and 100.'
    }, null, 2));
  }
  
  // Calculate pagination
  const total = quotes.length;
  const totalPages = Math.ceil(total / perPage);
  
  // If requested page is beyond total pages
  if (page > totalPages && total > 0) {
    return res.status(400).send(JSON.stringify({
      error: 'Bad Request',
      message: `Invalid page number. Total number of pages: ${totalPages}`
    }, null, 2));
  }
  
  // Get paginated data
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedQuotes = quotes.slice(start, end);
  
  // Create response with pagination metadata
  const response: PaginatedResponse = {
    data: paginatedQuotes,
    pagination: {
      total,
      page,
      perPage,
      totalPages
    }
  };
  
  // Successful response with formatted JSON
  res.status(200).send(JSON.stringify(response, null, 2));
} 