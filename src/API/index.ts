import axios, { AxiosRequestConfig, Method } from "axios";

const instance = axios.create({})
instance.defaults.timeout = 30000;
instance.defaults.baseURL = 'https://subgraph.intoverse.co/subgraphs/name/match-subgraph'


const baseURL = 'https://swap-api.n2ft.com'

export const VERIFY_URL = baseURL + '/api/makeMerkleTree?dayID='
export const MAKEDEAL_URL = baseURL + '/api/match?dayID='
export const VERIFY_BALANCE_URL = baseURL + '/api/verifyBalanceLeave'
export const GET_USER_DATA_URL = baseURL + '/api/getUserData'
export const UPDATE_REALTIME_BALANCE_URL = baseURL + '/api/updateRealTimeBalance'
export const GET_NFTINFO_LIST_URL = baseURL + '/api/getNftInfoListFromContract?dayID='




export async function getRequest(url:string) {
  return new Promise((resolut,reject)=>{
    instance.get(url).then((result:any)=>{
      console.log('get result=',result)
      if (result.status == 200){
        if (result.data){
          resolut(result.data)
        }else {
          reject(result.data.code)
        }
      }else {
        reject()
      }
    }).catch((e:any)=>{
      console.log('get e===',e);
      reject(e)
    })
  })
}
export async function postRequest(url:string,params:any,config?:any) {
  return new Promise((resolut,reject)=>{
    instance.post(url,params,config).then((result:any)=>{
      console.log('post result=',result)
      if (result.status == 200){
        if (result.data){
          resolut(result.data)
        }else {
          if (result.data.code == 404){
            reject(result.data.code) // not bind
          }else {
            // notification.error({
            //   message:result.data.msg || 'Query failed, please try again later.'
            // })
            reject(result.data.code)
          }
        }
      }else {
        reject()
      }
    }).catch((e:any)=>{
      console.log('post e===',e);
      // notification.error({
      //   message:'Network error, please try again later'
      // })
      reject(e)
    })
  })
}