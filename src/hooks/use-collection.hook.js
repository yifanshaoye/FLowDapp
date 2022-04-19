import { query } from '@onflow/fcl'
import { useState, useEffect } from 'react'
import { CHECK_COLLECTION } from '../flow/check-collection.script'

export default function useCollection(user) {
  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState(false)

  useEffect(() => {
    if(!user?.addr) return
    const checkCollection = async () => {
      try {
        let res = await query({
          cadence: CHECK_COLLECTION,
          args: (arg, t) => [arg(user?.addr, t.Address)],
        });
        setCollection(res);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    checkCollection();
  }, [])

  const createCollection = async () => {
    setCollection(true)
  }

  const deleteCollection = async () => {
    setCollection(false)
    window.location.reload()
  }

  return {
    loading,
    collection,
    createCollection,
    deleteCollection
  }
}
