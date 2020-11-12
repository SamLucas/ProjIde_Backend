import 'dotenv/config'

const EvironmentConfig = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    },
    useNullAsDefault: false
  },
  production: {
    client: process.env.BD_CLIENT,
    connection: {
      host: process.env.BD_HOST,
      database: process.env.BD_DATABASE,
      user: process.env.BD_USER,
      password: process.env.BD_PASSWORD,
      port: process.env.BD_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  }
}

type TypeDataBase = "development" | "production"

const indexTypeDataBase: keyof typeof EvironmentConfig =
  process.env.DATABASE_TYPE as TypeDataBase

module.exports = EvironmentConfig[indexTypeDataBase || "development"]
