import { useState, useEffect } from 'react'
import { auth } from '../fb/config'
import { useAuthContext } from './useAuthContext'
import { stor } from '../fb/config'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // using async func because we need to wait for the user to be created before we can upload the thumbnail
      const res = await auth.createUserWithEmailAndPassword(email, password) //firebase function that accept 2 args

      if (!res) 
      {
        throw new Error('Could not complete signup')
      }

      // upload thumbnail path to storage, using user's unqiue ID to create a folder in thumbnail folder
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      // upload the to the path we created above, stored in the img obj so we can use it in the next step
      const img = await stor.ref(uploadPath).put(thumbnail);
      const url = await img.ref.getDownloadURL();

      // add display name to user along with the rendering the profile img
      await res.user.updateProfile({ displayName, photoURL: url}) // this way the url can be used for other component

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}