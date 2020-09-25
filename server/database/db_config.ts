import { PoolConfig } from 'pg'

const DATABASE_CONFIG : PoolConfig = {
    user: "postgres",
    password: "tycho0802326",
    host: "localhost",
    port: 5432,
    database: "newstyper"
}

export default DATABASE_CONFIG