import dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

// define a route handler for the default home page
app.get( "/", ( req: any, res: { send: (arg0: string) => void; } ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line: no-console
    console.log( `server started at http://localhost:${ port }` );
});
