import Router from 'next/router'
import { isClient } from '@/utils/envHelper'

export function get(name: string): string | undefined {
  const data = getAll()
  return data[name] ? String(data[name]) : undefined
}

export function getAll() {
  return isClient() && Router.router ? Router.query : {}
}
