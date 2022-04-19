import { query } from '@onflow/fcl';
import { useEffect, useReducer } from 'react'
import { GET_FUSD_BALANCE } from '../flow/get-fusd-balance.script';
import { defaultReducer } from '../reducer/defaultReducer'

export default function useFUSD(user) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })

  useEffect(() => {
    getFUSDBalance();
    //eslint-disable-next-line 
  }, [])

  const getFUSDBalance = async () => {
    dispatch({ type: 'PROCESSING' })
    try {
      //dispatch({ type: 'SUCCESS', payload: "100.00000000" })
      let response = await query({
        cadence: GET_FUSD_BALANCE,
        args: (arg, t) => [arg(user?.addr, t.Address)],
      });
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  return {
    ...state,
    getFUSDBalance
  }
}
