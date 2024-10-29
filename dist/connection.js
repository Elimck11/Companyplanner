import pkg from 'pg'; // Import the default export from pg package
const { Client } = pkg; // Destructure to get the Client from the default export
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'company_db',
    password: 'TQ135400$',
    port: 5432,
});
client.connect();
export default client; // Export the client as the default