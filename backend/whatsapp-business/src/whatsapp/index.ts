import axios from 'axios'

export const userNumber = '5511951865776'

export const watchNumbers = []

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
}

const sendMessageEndpoint = `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`

export const sendMessage = async (phoneNumber: string, payload: object) => {
  const payload2 = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    ...payload,
  }
  console.log(payload2, 'payload')

  try {
    const data = await axios.post(sendMessageEndpoint, payload2, axiosConfig)
    console.log(data, 'return data')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.response.data.error)
    console.log('axios:', error.message)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const forwardMessage = async (phoneNumber: string, message: any) => {
  const { type } = message
  const messageContent = message[type]

  const payload = {
    type,
    [type]: { id: messageContent.id },
  }

  // for image, videos
  if (messageContent.caption) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(payload[type] as { id: string; caption?: string }).caption =
      messageContent.caption
  }

  // for text messages
  if (messageContent.body) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(payload[type] as { id: string; body?: unknown }).body =
      messageContent.body
  }

  sendMessage(phoneNumber, payload)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendSticker = (phoneNumber: string, message: any) => {
  const { type } = message
  if (type != 'image' && type != 'video') {
    console.log('Invalid message type')
    return
  }
  // download media

  // convert to sticker format

  // upload media

  // sendo message with sticker id

  const id = message[type].id

  const payload = {
    type: 'sticker',
    sticker: { id },
  }

  sendMessage(phoneNumber, payload)
}
