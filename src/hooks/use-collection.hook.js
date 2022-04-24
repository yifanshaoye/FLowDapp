import { mutate, query, tx } from '@onflow/fcl'
import { useState, useEffect } from 'react'
import { CHECK_COLLECTION } from '../flow/check-collection.script'
import { CREATE_COLLECTION } from '../flow/create-collection.tx'

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
    // eslint-disable-next-line
  }, [])

  const createCollection = async () => {
    //setCollection(true)
    try {
      let res = await mutate ({
        cadence: CREATE_COLLECTION,
        limit: 66
      })
      await tx(res).onceSealed()
      setCollection(true)
      setLoading(false)
    } catch (err) {
      console.log("Create Collection Err: ", err)
      setLoading(false)
    }
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
