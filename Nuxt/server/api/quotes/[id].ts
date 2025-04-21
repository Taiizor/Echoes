import { defineEventHandler, createError } from 'h3'
import quotesData from '@/data/quotes.json'

export default defineEventHandler((event) => {
  const id = parseInt(event.context.params?.id || '', 10)
  
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid ID format'
    })
  }
  
  const quote = quotesData.find(q => q.id === id)
  
  if (!quote) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Quote not found'
    })
  }
  
  return quote
}) 