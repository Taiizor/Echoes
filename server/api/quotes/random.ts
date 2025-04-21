import { defineEventHandler, getQuery } from 'h3'
import quotesData from '@/data/quotes.json'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const author = query.author as string
  const lang = query.lang as string
  
  let filteredQuotes = [...quotesData]
  
  // Yazar filtreleme
  if (author) {
    filteredQuotes = filteredQuotes.filter(q => 
      q.author.toLowerCase().includes(author.toLowerCase())
    )
  }
  
  // Dil filtreleme
  if (lang) {
    filteredQuotes = filteredQuotes.filter(q => q.lang === lang)
  }
  
  // Hiç eşleşme yoksa
  if (filteredQuotes.length === 0) {
    return {
      statusCode: 404,
      message: 'No quotes found with the specified criteria'
    }
  }
  
  // Rastgele bir alıntı döndür
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length)
  return filteredQuotes[randomIndex]
}) 