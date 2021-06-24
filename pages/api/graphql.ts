import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// define model: what queries/mutations should do
const typeDefs = gql`
  type Card {
    id: Int!
    name: String!
    email: String!
    phone: String!
    biography: String!
    cardId: String!
    twitter: String!
    github: String!
    website: String!
  }
  type Query {
    getCards: [Card]

  }
`;

// used to carry out queries/mutations
const resolvers = {
  Query: {
    getCards: async () => {
      return await prisma.card.findMany({
        take: 10
      });
    }
  }
};

export const config = {
  api: {
    bodyParser: false
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

const handler = apolloServer.createHandler({
  path: '/api/graphql'
})

export default handler;