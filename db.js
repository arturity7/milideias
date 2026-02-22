import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'milideias',
  password: '201330casa',
  port: 5432,
})
pool.connect()
  .then(() => console.log("🟢 Conectado ao PostgreSQL"))
  .catch(err => console.error("🔴 Erro:", err))