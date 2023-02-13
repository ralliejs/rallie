import type { Socket } from '@rallie/core'

export const socketsPool = new Map<string, Socket>()
