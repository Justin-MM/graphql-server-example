import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './../data/_db.js';

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find((g: { id: any; }) => g.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find((review: { id: any; }) => review.id === args.id)
        },
        authors() {
            return db.authors
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id)
        },
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((g) => g.id !== args.id)
            return db.games
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()                
            }
            db.games.push(game)
            return game
        },
        updateGame(_, args) {
            db.games = db.games.map((g) => {
                if (g.id === args.id) {
                    return {...g, ...args.edits}
                }
                return g
            })

            return db.games.find((g) => g.id === args.id)
        }
    }
}
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);