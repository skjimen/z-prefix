module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        port: 5432,
        database: 'inventory',
        user: 'skjimen',
        password: 'pacalou23',
      },
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
  
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL, 
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
  };
  