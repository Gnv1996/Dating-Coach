import axios from 'axios'
import { persona, api } from '../config'

export const callPersona = async (prompt, userId) => {
  const hashId = btoa(String(userId).toLowerCase())
 

  if(typeof hashId === null){
    alert("Please login first")
  }
  const response = await axios.post(api + 'generate', {
    prompt,
    userId,
    persona:persona
  })

  return response.data.data.choices[0].message.content
}
