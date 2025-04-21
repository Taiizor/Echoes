import type { Ref } from 'vue'
import quotesData from '@/data/quotes.json'

export interface Quote {
  id: number
  lang: string
  author: string
  quote: string
}

export default function useQuotes() {
  const quotes: Ref<Quote[]> = ref(quotesData)
  
  // Tüm alıntıları döndür
  const getAllQuotes = () => quotes.value
  
  // ID'ye göre alıntı döndür
  const getQuoteById = (id: number) => quotes.value.find(quote => quote.id === id)
  
  // Rastgele bir alıntı döndür
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.value.length)
    return quotes.value[randomIndex]
  }
  
  // Yazara göre rastgele alıntı döndür
  const getRandomQuoteByAuthor = (author: string) => {
    const filteredQuotes = quotes.value.filter(quote => 
      quote.author.toLowerCase().includes(author.toLowerCase())
    )
    
    if (filteredQuotes.length === 0) {
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length)
    return filteredQuotes[randomIndex]
  }
  
  // Dile göre rastgele alıntı döndür
  const getRandomQuoteByLang = (lang: string) => {
    const filteredQuotes = quotes.value.filter(quote => quote.lang === lang)
    
    if (filteredQuotes.length === 0) {
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length)
    return filteredQuotes[randomIndex]
  }
  
  // Yazar ve dile göre rastgele alıntı döndür
  const getRandomQuoteByAuthorAndLang = (author: string, lang: string) => {
    const filteredQuotes = quotes.value.filter(quote => 
      quote.author.toLowerCase().includes(author.toLowerCase()) && 
      quote.lang === lang
    )
    
    if (filteredQuotes.length === 0) {
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length)
    return filteredQuotes[randomIndex]
  }

  return {
    quotes,
    getAllQuotes,
    getQuoteById,
    getRandomQuote,
    getRandomQuoteByAuthor,
    getRandomQuoteByLang,
    getRandomQuoteByAuthorAndLang
  }
} 