// backend
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Required to emulate __dirname in ESM

const app = express();
const port = 4000;

// Emulate __dirname
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

// Log all requests to the server
app.use( ( req, res, next ) => {
  next();
  console.log( req.url );
} );

// Proxy for Willys
app.get( '/api/*', async ( req, res ) => {
  try {
    const response = await fetch( `https://www.willys.se${ req.url.slice( 4 ) }` );
    const data = await response.json();
    res.json( data );
  } catch ( err ) {
    console.error( 'Error when making a request to Willys:', err );
    res.status( 500 ).json( { error: 'Server error' } );
  }
} );

// Serve the built application (dist folder)
const distFolder = path.join( __dirname, '..', 'dist' );
app.use( express.static( distFolder ) );
app.get( '*', ( req, res ) => {
  res.sendFile( path.join( distFolder, 'index.html' ) );
} );

// Start the server
app.listen( port, () => console.log( `Backend listening on port ${ port }` ) );