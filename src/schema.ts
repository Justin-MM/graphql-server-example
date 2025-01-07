// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # (!) symbol means that the property is required

 type Game {
    id: ID!
    title: String!
    platform: [String!]!
 }

 type Review {
    id: ID!
    rating: Int!
    content: String!
 }

 type Author {
    id: ID!
    name: String!
    verified: Boolean!
 }

 type Query {
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    authors: [Author]
 }
`;