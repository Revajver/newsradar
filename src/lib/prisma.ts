import { PrismaClient } from '@prisma/client';

declare global {
  // allow global prisma during development to avoid exhausting connections
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Ensure DATABASE_URL is loaded from .env
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.warn('Warning: DATABASE_URL is not set. Prisma may fail to initialize.');
}

// Pass datasources explicitly so PrismaClient can initialize under Prisma v7
const clientOptions: any = {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
};

export const prisma = global.prisma ?? new PrismaClient(clientOptions);
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
