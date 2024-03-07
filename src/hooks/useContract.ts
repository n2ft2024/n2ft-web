import { ERC721, ERC20, N2NFT, N2Relation, GNFT, GMINT, N2SWAP ,N2NPOOL, N2SwapMerkle} from '@/ABI/typechain';
import { useAccount,useNetwork } from 'wagmi';
import { Contract, InterfaceAbi, JsonRpcProvider, JsonRpcSigner, ethers} from "ethers"
import {useEffect, useMemo, useState} from "react";
import ERC20_ABI from "@/ABI/ERC20.json";
import ERC721_ABI from "@/ABI/ERC721.json";
import {AddressMap} from '@/Contract/addresses';
import { ChainID } from '@/Contract/chains';

import N2NFT_ABI from "@/ABI/N2NFT.json";
import N2Relation_ABI from "@/ABI/N2Relation.json";
import GMINT_ABI from "@/ABI/GMINT.json";
import GNFT_ABI from "@/ABI/GNFT.json";
import N2SWAP_ABI from "@/ABI/N2SWAP.json";
import N2NPOOL_ABI from '@/ABI/N2NPOOL.json'
import N2SwapMerkle_ABI from '@/ABI/N2SwapMerkle.json'


const rpsList:any[string] = [
  "https://bsc-dataseed1.bnbchain.org",
  "https://bsc-dataseed2.bnbchain.org",
  "https://bsc-dataseed3.bnbchain.org",
  "https://bsc-dataseed4.bnbchain.org",
  "https://bsc-dataseed1.defibit.io",
  "https://bsc-dataseed2.defibit.io",
  "https://bsc-dataseed3.defibit.io",
  "https://bsc-dataseed4.defibit.io",
  "https://bsc-dataseed1.ninicoin.io",
  "https://bsc-dataseed2.ninicoin.io",
  "https://bsc-dataseed3.ninicoin.io",
  "https://bsc-dataseed4.ninicoin.io",
  "https://bsc.publicnode.com"
]
let random = Math.floor(Math.random() * rpsList.length)
if (random >= rpsList.length){
  random = 0
}
export function useProvider(){
  const [provider,setProvider] = useState<any>(null)
  useEffect(()=>{
    let p = null
    if (global.ethereum == null) {
      p = ethers.getDefaultProvider(rpsList[random])
      console.log("MetaMask not installed; using read-only defaults rpc:",rpsList[random])
    } else {
    p = new ethers.BrowserProvider(global.ethereum)
  }
  setProvider(p)
  },[])
  return provider
}
export function useSigner(){
  const provider = useProvider()
  const [signer,setSigner] = useState<any>()
  const {address} = useAccount()
  useEffect(()=>{
    async function getSigner(){
      let sign:any = null
      if (global.ethereum == null) {
        sign = new JsonRpcSigner(provider,String(address))
      }else {
        sign = await provider.getSigner();
      }
      setSigner(sign)
    }
    if (provider && address){
      getSigner()
    }
  },[provider,address])
  return signer
}

export function getContract(address: string, abi: any,other?:any) {
  if (!address || !abi) {
      return null;
  }
  return new ethers.Contract(address, abi, other);
}

export function getTokenContract(address: string,provider:any) {
    return getContract(address, ERC20_ABI,provider);
}

export function getNFTContract(address: string,provider:any) {
  return getContract(address, ERC721_ABI,provider);
}

export function useContract(address: string, ABI: any, withSignerIfPossible = true): Contract | null {
  const {address:account} = useAccount()
  const provider = useProvider()
  const signer = useSigner()
  return useMemo(() => {
      if (!address || !ABI || !signer) return null
      try {
          return getContract(address, ABI, withSignerIfPossible ? signer : provider)
      } catch (error) {
          console.error('Failed to useContract', error)
          return null
      }
  }, [address, ABI, withSignerIfPossible, account,signer])
}

export function useTokenContract<TContract extends Contract>(tokenAddress: AddressMap){
  const [contract,setContract] = useState<TContract | null>(null)
  const provider = useProvider();
  const signer = useSigner();
  const { chain = { id: 1 } } = useNetwork();

  useEffect(()=>{
    function getContract(){
      const address = tokenAddress[chain.id as keyof typeof tokenAddress];
      if (!address) setContract(null)
      const tract = getTokenContract(address,signer) as TContract
      setContract(tract)
    }
    if (provider && signer){
      getContract()
    }

  },[tokenAddress, chain.id, signer, provider])
  return contract
}
export function useNFTContract<TContract extends Contract>(tokenAddress: AddressMap){
  const [contract,setContract] = useState<TContract | null>(null)
  const provider = useProvider();
  const signer = useSigner();
  const { chain = { id: 1 } } = useNetwork();

  useEffect(()=>{
    function getContract(){
      const address = tokenAddress[chain.id as keyof typeof tokenAddress];
      if (!address) setContract(null)
      const tract = getNFTContract(address,signer) as TContract
      setContract(tract)
    }
    if (provider && signer){
      getContract()
    }

  },[tokenAddress, chain.id, signer, provider])
  return contract
}
export const useStaticContract = <TContract extends Contract = Contract>(ABI:InterfaceAbi,addressMap: AddressMap,networkId:ChainID,rpc:string) => {
  const [contract,setContract] = useState<TContract | null>(null)
  const provider = new JsonRpcProvider(rpc)
  useEffect(()=>{
    function getContract(){
      const address = addressMap[networkId as keyof typeof addressMap];
      if (!address){
        setContract(null)
        return
      }
      const tract = new Contract(address, ABI, provider) as TContract
      setContract(tract)
    }
    if (provider){
      getContract()
    }

  },[addressMap, rpc, networkId, provider])
  return contract
};

export function useDynamicContract<TContract extends any>(addressMap: AddressMap, ABI:InterfaceAbi, asSigner = true){
  const [contract,setContract] = useState<TContract | null>(null)
  const provider = useProvider();
  const signer = useSigner();
  const { chain = { id: 1 } } = useNetwork();

  useEffect(()=>{
    function getContract(){
      const address = addressMap[chain.id as keyof typeof addressMap];
      if (!address) {
        setContract(null)
        return
      }
      const providerOrSigner = asSigner && signer ? signer : provider;
      const tract = new Contract(address, ABI, providerOrSigner) as TContract;
      setContract(tract)
    }
    if (provider && signer){
      getContract()
    }

  },[addressMap, chain.id, asSigner, signer, provider])
  return contract
}

export const createDynamicContract = <TContract extends any>(ABI: InterfaceAbi) => {
    return (addressMap: AddressMap, asSigner = true) => {
      const provider = useProvider();
      const signer = useSigner();
      const { chain = { id: 1 } } = useNetwork();
      return useMemo(() => {
        const address = addressMap[chain.id as keyof typeof addressMap];
        if (!address || !signer) return null;

        const providerOrSigner = asSigner && signer ? signer : provider;

        return new Contract(address, ABI, providerOrSigner) as TContract;
      }, [addressMap, chain.id, asSigner, signer, provider]);
    };
};



export const useDynamicTokenContract = createDynamicContract<ERC20>(ERC20_ABI);
export const useDynamic721Contract = createDynamicContract<ERC721>(ERC721_ABI);

export const useN2FTContract = createDynamicContract<N2NFT>(N2NFT_ABI);
export const useN2RelationContract = createDynamicContract<N2Relation>(N2Relation_ABI);
export const useGNFTContract = createDynamicContract<GNFT>(GNFT_ABI);
export const useGMINTContract = createDynamicContract<GMINT>(GMINT_ABI);
export const useN2SWAPContract = createDynamicContract<N2SWAP>(N2SWAP_ABI);
export  const useN2NPOOLContract=createDynamicContract<N2NPOOL>(N2NPOOL_ABI);
export  const useN2SwapMerkleContract=createDynamicContract<N2SwapMerkle>(N2SwapMerkle_ABI);


