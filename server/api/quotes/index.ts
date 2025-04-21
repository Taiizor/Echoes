import { defineEventHandler } from 'h3'
import quotesData from '@/data/quotes.json'

export default defineEventHandler(() => {
  return quotesData
}) 