import { Server } from '@hocuspocus/server'
import fetch from 'node-fetch'
import { Database } from '@hocuspocus/extension-database'
import 'dotenv/config'
import pkg from 'pg'

const { Client } = pkg

const PORT = 3035

// DB Connection
const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

client.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

// server editor
const server = Server.configure({
  port: 1234,
  async onConnect() {
    console.log('🔮')
  },
  async onChange(event) {
    // обновляем udpdated_at у проекта
    // const { token } = event.context
    // const [scope, projectId, pageId] = event.documentName.split('-')
    // await fetch(`https://api-knowledge.admlr.lipetsk.ru/api/project/touch/${projectId}`, {
    //   method: 'POST', headers: { Authorization: 'Bearer ' + token }
    // })
  },
  extensions: [
    new Database({
      fetch: async ({ documentName }) => {
        // возвращаем значение в бинарном виде
        // бинарный тип нужен для синхронизации измнений (JSON HTML и строка синхронизироваться не будут)
        const [scope, projectId, pageId] = documentName.split('-')
        try {
          const res = await client.query(
            `SELECT * FROM page WHERE id = ${pageId} LIMIT 1`
          )
          return res.rows[0].page_value
        } catch (error) {
          console.log(error)
        }
      },
      store: async (data) => {
        // запись бинарника в бд
        const [scope, projectId, pageId] = data.documentName.split('-')
        try {
          const query = `UPDATE "page" 
                   SET "page_value" = $1
                   WHERE "id" = $2`
          return await client.query(query, [data.state, pageId])
        } catch (error) {
          console.log(error)
        }
      }
    })
  ]
})

// запускаем вебсокет
server.listen()
