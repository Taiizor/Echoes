import { useState, useEffect } from 'react';
import quotesData from '@/data/quotes.json';

export interface Quote {
  id: number;
  lang: string;
  author: string;
  quote: string;
}

export interface PaginationData {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface QuotesResponse {
  data: Quote[];
  pagination: PaginationData;
}

export default function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setQuotes(quotesData);
  }, []);
  
  // Fetch paginated data from API
  const fetchQuotesPaginated = async (page = 1, perPage = 100) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/quotes?page=${page}&perPage=${perPage}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred in the API request');
      }
      
      const data: QuotesResponse = await response.json();
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Return all quotes
  const getAllQuotes = () => quotes;
  
  // Return quote by ID
  const getQuoteById = (id: number) => quotes.find(quote => quote.id === id);
  
  // Return a random quote
  const getRandomQuote = () => {
    const quoteSource = quotes.length > 0 ? quotes : quotesData;
    if (quoteSource.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * quoteSource.length);
    return quoteSource[randomIndex];
  };
  
  // Return a random quote by author
  const getRandomQuoteByAuthor = (author: string) => {
    const authors = author.toLowerCase().split(',').map(a => a.trim());
    const filteredQuotes = quotes.filter(quote => {
      const quoteAuthor = quote.author.toLowerCase();
      return authors.some(a => quoteAuthor.includes(a));
    });
    
    if (filteredQuotes.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
  };
  
  // Return a random quote by language
  const getRandomQuoteByLang = (lang: string) => {
    const languages = lang.toLowerCase().split(',').map(l => l.trim());
    const filteredQuotes = quotes.filter(quote => 
      languages.includes(quote.lang.toLowerCase())
    );
    
    if (filteredQuotes.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
  };
  
  // Return a random quote by author and language
  const getRandomQuoteByAuthorAndLang = (author: string, lang: string) => {
    const authors = author.toLowerCase().split(',').map(a => a.trim());
    const languages = lang.toLowerCase().split(',').map(l => l.trim());
    
    const filteredQuotes = quotes.filter(quote => {
      const quoteAuthor = quote.author.toLowerCase();
      return authors.some(a => quoteAuthor.includes(a)) && 
             languages.includes(quote.lang.toLowerCase());
    });
    
    if (filteredQuotes.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
  };

  return {
    error,
    quotes,
    loading,
    getAllQuotes,
    getQuoteById,
    getRandomQuote,
    fetchQuotesPaginated,
    getRandomQuoteByLang,
    getRandomQuoteByAuthor,
    getRandomQuoteByAuthorAndLang
  };
} 