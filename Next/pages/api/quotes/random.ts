import type { NextApiRequest, NextApiResponse } from 'next';
import quotes from '@/data/quotes.json';
import { Quote } from '@/hooks/useQuotes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { author, lang } = req.query;
  
  // Set content type header for JSON responses
  res.setHeader('Content-Type', 'application/json');
  
  // HTTP method check
  if (req.method !== 'GET') {
    return res.status(405).send(JSON.stringify({ 
      error: 'Method Not Allowed', 
      message: `The '${req.method}' method is not supported for this endpoint` 
    }, null, 2));
  }
  
  let filteredQuotes: Quote[] = [...quotes];
  
  // Filter by author
  if (author) {
    const authors = String(author).toLowerCase().split(',').map(a => a.trim());
    filteredQuotes = filteredQuotes.filter(quote => {
      const quoteAuthor = quote.author.toLowerCase();
      return authors.some(a => quoteAuthor.includes(a));
    });
  }
  
  // Filter by language
  if (lang) {
    const languages = String(lang).toLowerCase().split(',').map(l => l.trim());
    filteredQuotes = filteredQuotes.filter(
      quote => languages.includes(quote.lang.toLowerCase())
    );
  }
  
  if (filteredQuotes.length === 0) {
    return res.status(404).send(JSON.stringify({ 
      error: 'No Quotes Found', 
      message: 'No quotes found matching the criteria' 
    }, null, 2));
  }
  
  // Select a random quote
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  
  // Successful response with formatted JSON
  res.status(200).send(JSON.stringify(randomQuote, null, 2));
} 