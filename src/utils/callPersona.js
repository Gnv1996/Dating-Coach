import axios from 'axios'
import { persona, api } from '../config'

export const callPersona = async (prompt, userId) => {
  const hashId = btoa(String(userId).toLowerCase())
  console.log(hashId,"ooooo")

  const response = await axios.post(api + 'generate', {
    prompt,
    userId,
    persona:"gf"
  })

  return response.data.data.choices[0].message.content
}
