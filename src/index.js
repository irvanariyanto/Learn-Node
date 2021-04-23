import express from 'express';
import mongoose from 'mongoose';
import console from "consola";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { ApolloServer } from "apollo-server-express";


import { DB, IN_PROD, APP_PORT } from './config';


// Initialize the App
const app = express();

// Setting up the middlewares

// Starting Apollo-Express-Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: IN_PROD 
        ? false 
        : {
            settings: {
                "request.credentials": "include",
            },
        },
});

const startApp = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.success({
            message: `Successfully connected with the database \n${DB}`,
            badge: true,
        });
        app.listen({ poer: APP_PORT }, () =>
        console.success({
            message: `Apollo Server starte on \nhttp://localhost:${APP_PORT}${server.graphqlPath}`,
            badge: true,
        })
        )
    } catch (err) {
        console.error({
            message: `Successfully connected with the database \n${DB}`,
            badge: true,
        })
    }
};

startApp();