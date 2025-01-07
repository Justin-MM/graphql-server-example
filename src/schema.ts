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
    reviews: [Review!]
 }

 type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
 }

 type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
 }

 type Query {
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
 }

 type Mutation {
    deleteGame(id: ID!): [Game]
 }
`;