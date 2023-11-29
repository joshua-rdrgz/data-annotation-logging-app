import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { type Session, getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

/**
 * Gets Session from NextAuth - use in getServerSideProps or API routes
 * @param args Server "req" and "res"
 * @returns Session
 */
export async function getAuthSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
