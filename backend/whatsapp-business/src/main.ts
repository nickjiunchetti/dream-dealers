import express from 'express'
import bodyParser from 'body-parser'

import { forwardMessage, sendSticker, userNumber } from './whatsapp'

const host = process.env.HOST || 'localhost'
const port = Number(process.env.PORT)

const app = express().use(bodyParser.json())

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})

// test server
app.get('/ping', (req, res) => {
  res.status(200).send({ message: 'pong' })
})

// validate web hook
app.get('/whatsapp-webhook', (req, res) => {
  const verify_token = process.env.VERIFY_TOKEN

  // Parse params from the webhook verification request
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  // Check the mode and token sent are correct
  if (token != verify_token || mode != 'subscribe') {
    console.log('invalid payload, verify token or mode invalid')
    res.sendStatus(403)
    return
  }

  // Respond with 200 OK and challenge token from the request
  console.log('WEBHOOK_VERIFIED')
  res.status(200).send(challenge)
})

// receive messages callback
app.post('/whatsapp-webhook', async (req, res) => {
  const data = req.body

  const messages = data.entry[0].changes[0].value.messages
  // const statuses = data.entry[0].changes[0].value.statuses

  console.log(messages, 'callback messages')
  if (messages?.length) {
    sendSticker(userNumber, messages[0])
  }

  res.sendStatus(200)
})
