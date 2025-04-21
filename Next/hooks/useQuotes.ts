import { useState, useEffect } from 'react';
import quotesData from '@/data/quotes.json';

export interface Quote {
  id: number;
  lang: string;
  author: string;
  quote: string;
}

export default function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  
  useEffect(() => {
    setQuotes(quotesData);
  }, []);
  
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
    quotes,
    getAllQuotes,
    getQuoteById,
    getRandomQuote,
    getRandomQuoteByAuthor,
    getRandomQuoteByLang,
    getRandomQuoteByAuthorAndLang
  };
} 