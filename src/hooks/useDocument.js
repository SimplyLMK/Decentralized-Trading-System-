import { useEffect, useState } from "react"
import { fs } from "../fb/config"

//__writen by 104179506__Le Minh Kha
// recycles from another project of mine which also used firebase
export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // realtime document data
  useEffect(() => {
    const ref = fs.collection(collection).doc(id)

    const unsubscribe = ref.onSnapshot(snapshot => {
      // need to make sure the doc exists & has data
      if(snapshot.data()) {
        setDocument({...snapshot.data(), id: snapshot.id})
        setError(null)
      }
      else {
        setError('waiting for transaction...')
      }
    }, err => {
      console.log(err.message)
      setError('failed to get document')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, id])

  return { document, error }
}