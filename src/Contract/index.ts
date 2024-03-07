import { publicClient } from '@/provider/Web3ModalProvider';
import { GasInfo, RefreshConfig, ZERO_ADDRESS, formatBalance } from '@/Common';
import { BigNumberish, Contract, MaxUint256, TransactionResponse, formatUnits, parseUnits } from 'ethers';
import { useQuery, useMutation } from 'react-query'
import { GMINT_ADDRESSSES, N2Relation_ADDRESSSES, USDT_ADDRESSSES, N2NPOOL_ADDRESSSES, N2SWAP_ADDRESSSES, N2NFT_ADDRESSSES, GNFT_ADDRESSSES } from '@/Contract/addresses';
import { useAccount, useNetwork } from 'wagmi';
import { AddressMap } from './addresses';
import { useLoadingContext, LoadingType } from '@/provider/loadingProvider';
import { useDynamicContract, useGMINTContract, useN2RelationContract, useTokenContract, useN2NPOOLContract, useN2SWAPContract, useNFTContract, useN2FTContract, useGNFTContract } from '@/hooks/useContract';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import axios from 'axios'
import { Abi, isAddress } from 'viem'
import BigNumber from 'bignumber.js';
import { GET_NFTINFO_LIST_URL, getRequest } from '@/API';
import { multicall } from 'viem/contract'
import N2SWAP_ABI from '@/ABI/N2SWAP.json'

interface Transaction {
  title: string,
  args: any[],
  gasLimit?: boolean,
  onSuccess?: Function,
  onError?: Function
}
export function useSendTransaction({
  contractAddress,
  abi,
  functionName,
  tokenAddress = USDT_ADDRESSSES,
}: {
  contractAddress: AddressMap,
  abi: any,
  functionName: string,
  tokenAddress?: AddressMap,
}) {
  const { open } = useWeb3Modal()
  const loading = useLoadingContext()
  const { chain = { id: 56 } } = useNetwork()
  const { address } = useAccount()
  const contract = useDynamicContract(contractAddress, abi) as any
  const tokenContract = useTokenContract(tokenAddress)
  function sendTransaction(params: Transaction) {
    loading.show(LoadingType.pending, 'Querying authorization information...')
    return new Promise(async () => {
      if (!address) {
        loading.show(LoadingType.error, 'Please connect wallet')
        open && open()
        return
      }
      if (tokenContract) {
        try {
          send(params, functionName)
        } catch (error: any) {
          console.log('allowance error===', error)
        }
      }
    })
    async function send(params: Transaction, functionName: string) {
      if (!contract) {
        loading.show(LoadingType.error, 'create dynamic Contract error')
        return
      }
      loading.show(LoadingType.confirm, params.title)
      contract[functionName](...params.args, params.gasLimit == false ? {} : { gasLimit: 1500000 })
        .then(async (response: TransactionResponse) => {
          loading.show(LoadingType.pending, response.hash)

          console.log('response====', response)

          const result: any = await response.wait();
          console.log('result===', result)
          if (result.status == 1) {
            loading.show(LoadingType.success, response.hash)
            params.onSuccess && params.onSuccess()
          } else {
            loading.show(LoadingType.error, 'Please check the error message in the blockchain explorer')
            params.onError && params.onError()
          }
        })
        .catch((err: any) => {
          console.log(functionName, err)
          loading.show(LoadingType.error, err.data?.message || err.reason || err.message, err.transactionHash)
          params.onError && params.onError()
        })
    }
  }

  return useMutation((params: Transaction) => sendTransaction(params))
}

interface TransactionOld {
  title: string,
  func: Function,
  args: any[],
  gasLimit?: boolean,
  onSuccess?: Function,
  onError?: Function,
}

export function useSendTransactionOld() {
  const loading = useLoadingContext()
  function sendTransaction(params: TransactionOld) {
    return new Promise(() => {
      loading.show(LoadingType.confirm, params.title)
      params.func(...params.args, params.gasLimit == true ? GasInfo : {})
        .then(async (response: TransactionResponse) => {
          loading.show(LoadingType.pending, response.hash)
          console.log('response====---', response)
          await response.wait();
          loading.show(LoadingType.success, response.hash)
          params.onSuccess && params.onSuccess()
        })
        .catch((err: any) => {
          console.log('re==', err)
          loading.show(LoadingType.error, err.data?.message || err.reason || err.info?.error?.message || err.message, err.transactionHash)
          params.onError && params.onError(err.data?.message || err.reason || err.info?.error?.message || err.message, err.transactionHash)
        })
    })
  }

  return useMutation((params: TransactionOld) => sendTransaction(params))
}


export function useSendTransactionMerkle() {
  const loading = useLoadingContext()
  function sendTransaction(params: TransactionOld) {
    return new Promise(() => {
      loading.show(LoadingType.confirm, params.title)
      params.func(...params.args, params.gasLimit == true ? GasInfo : {})
        .then(async (response: TransactionResponse) => {
          console.log('useSendTransactionMerkle response====---', response)
          if (response) {
            params.onSuccess && params.onSuccess()
          } else {
            params.onError && params.onError()
          }

        })
        .catch((err: any) => {
          console.log('re==', err)
          loading.show(LoadingType.error, err.data?.message || err.reason || err.info?.error?.message || err.message, err.transactionHash)
          params.onError && params.onError(err.data?.message || err.reason || err.info?.error?.message || err.message, err.transactionHash)
        })
    })
  }

  return useMutation((params: TransactionOld) => sendTransaction(params))
}

export function useGetInviter() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const contract: any = useN2RelationContract(N2Relation_ADDRESSSES)

  async function fetchData() {
    if (!contract || !address) {
      return
    }

    const inviter: string = await contract.Inviter(address)
    const invList: string[] = await contract.getInvList(address)
    const invListLength = await contract.invListLength(address)

    return {
      address: inviter,
      isBind: inviter != ZERO_ADDRESS,
      invList,
      invListLength: invListLength.toString()
    }
  }
  return useQuery(["useGetInviter" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!contract,

  })
}

export function useAddressBindStatus(address: string) {
  const { chain } = useNetwork()
  const networkId = chain?.id

  const contract: any = useN2RelationContract(N2Relation_ADDRESSSES)

  async function fetchData() {
    if (!contract || !address || !isAddress(address)) {
      return
    }

    const inviter: string = await contract.Inviter(address)
    return {
      isBind: inviter != ZERO_ADDRESS,
    }
  }
  return useQuery(["useAddressBindStatus" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!contract && !!address,

  })
}



export function useNFTPrice(typeID: number) {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const N2RelationContract = useN2RelationContract(N2Relation_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2RelationContract) {
      return
    }
    const price = await N2RelationContract.mPrice(typeID)

    return {
      price: formatUnits(price)
    }
  }
  return useQuery(["useNFTPrice" + typeID + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2RelationContract,
  })
}


export function useMyNFTInfo() {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const N2RelationContract = useN2RelationContract(N2Relation_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2RelationContract) {
      return
    }
    let integral = 0
    const mLv = await N2RelationContract.mLv(address)
    const usdtReward = await N2RelationContract.USDTReward(address)
    console.log('mLv==', mLv.toString())
    if (mLv.toString() == "1") {
      integral = 50
    }
    if (mLv.toString() == "2") {
      integral = 200
    }
    if (mLv.toString() == "3") {
      integral = 1000
    }
    if (mLv.toString() == "4") {
      integral = 10000
    }

    const USDTRewardClaimed = await N2RelationContract.USDTRewardClaimed(address)

    const nextMLV = await N2RelationContract.mPrice(Number(mLv) + 1)
    const currentMLV = await N2RelationContract.mPrice(Number(mLv))


    return {
      USDTRewardClaimed: formatBalance(formatUnits(USDTRewardClaimed)),
      usdtReward: formatBalance(formatUnits(usdtReward)),
      mLv: Number(mLv.toString()),
      integral,
      upgradePrice: Number(formatUnits(nextMLV)) - Number(formatUnits(currentMLV))
    }
  }
  return useQuery(["useMyNFTInfo" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2RelationContract,
  })
}


export function useTeamUserInfo(address: string) {

  const { chain } = useNetwork()
  const networkId = chain?.id

  const N2RelationContract = useN2RelationContract(N2Relation_ADDRESSSES)
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2RelationContract || !N2SWAPContract) {
      return
    }
    const RelationdayID = await N2RelationContract.dayID()
    const teamResult = await N2RelationContract.teamResult(address, RelationdayID)
    const mLv = await N2RelationContract.getVIP(address, RelationdayID)
    const viewResaleBuyPrice = await N2SWAPContract.viewResaleBuyPrice(address, RelationdayID)
    const reserveStats = await N2SWAPContract.reserveStats(address, RelationdayID)



    return {
      mLv: Number(mLv.toString()),
      teamResult: formatBalance(formatUnits(teamResult)),
      personReward: formatBalance(formatUnits(viewResaleBuyPrice)),
      reserveStats
    }
  }
  return useQuery(["useTeamUserInfo" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2RelationContract && !!N2SWAPContract,
  })
}


export function useMyNFTPointInfo() {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const N2NPOOLContract = useN2NPOOLContract(N2NPOOL_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2NPOOLContract) {
      return
    }

    const points = await N2NPOOLContract.points(address)
    const totalReward = await N2NPOOLContract.totalReward(address)
    const claimedReward = await N2NPOOLContract.claimedReward(address)
    const earned = await N2NPOOLContract.earned(address)

    return {
      claimedReward: formatBalance(formatUnits(claimedReward)),
      earned: formatBalance(formatUnits(earned)),
      totalReward: formatBalance(formatUnits(totalReward)),
      myPoints: formatUnits(points),

    }
  }
  return useQuery(["useMyNFTPointInfo" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2NPOOLContract,
  })
}

export function useGetNewInviter() {
  const { address } = useAccount()
  const contract = useN2RelationContract(N2Relation_ADDRESSSES)
  async function fetchData() {
    if (!contract || !address) {
      return
    }

    const inviter: string = await contract.Inviter(address)
    const invList: string[] = await contract.getInvList(address)

    return {
      address: inviter,
      isBind: inviter != ZERO_ADDRESS,
      invList: invList.length
    }
  }
  return useQuery(["useGetInviter" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!contract,

  })
}


export function useLaunchpadMintAmount() {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const GMINTContract = useGMINTContract(GMINT_ADDRESSSES)
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)

  async function fetchData() {

    if (!address || !GMINTContract || !N2SWAPContract) {
      return
    }
    const total = 50
    const dayID = await N2SWAPContract.dayID()
    const mintdayID = await GMINTContract.dayID()
    const mintAmount = await GMINTContract.mintAmount(dayID)
    const mintStats = await GMINTContract.mintStats(address, dayID)
    return {
      total,
      mintAmount: Number(mintAmount.toString()),
      leftAmount: total - Number(mintAmount.toString()),
      mintStats,
      mintPre: parseInt(Number(mintAmount.toString()) / total * 100 + ''),
      mintdayID: Number(mintdayID.toString())
    }
  }
  return useQuery(["useLaunchpadMintAmount" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!GMINTContract && !!N2SWAPContract,
  })
}





export function useN2NPoolData() {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const N2NPOOLContract = useN2NPOOLContract(N2NPOOL_ADDRESSSES)
  async function fetchData() {
    if (!address || !N2NPOOLContract) {
      return
    }

    const lastPrice = await N2NPOOLContract.lastPrice()
    const points = await N2NPOOLContract.points(address)
    return {
      lastPrice: Number(formatUnits(lastPrice)),
      points
    }
  }
  return useQuery(["useN2NPoolData" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2NPOOLContract,
  })
}

export function useUserInfo() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const N2RelationContract = useN2RelationContract(N2Relation_ADDRESSSES)
  async function fetchData() {

    if (!address || !N2RelationContract) {
      return
    }
    const RelationdayID = await N2RelationContract.dayID()
    const vip = await N2RelationContract.getVIP(address, RelationdayID)
    let vipString = vip.toString()
    if (Number(vipString) == 0) {
      vipString = '-'
    } else {
      vipString = 'V' + vipString
    }
    const teamResult = await N2RelationContract.teamResult(address, RelationdayID)
    const viewTeamReward = await N2RelationContract.viewTeamReward(address, RelationdayID)
    const claimedTeamReward = await N2RelationContract.claimedTeamReward(address)
    const teamTotalReward = Number(formatUnits(claimedTeamReward)) + Number(formatUnits(viewTeamReward))
    const promoteResult = await N2RelationContract.promoteResult(address, RelationdayID)
    const claimStats = await N2RelationContract.claimStats(address, RelationdayID)


    return {
      vip: vipString,
      teamResult: formatBalance(formatUnits(teamResult)),
      teamTotalReward: formatBalance(teamTotalReward),
      viewTeamReward: formatBalance(formatUnits(viewTeamReward)),
      claimedTeamReward: formatBalance(formatUnits(claimedTeamReward)),
      promoteResult: formatBalance(formatUnits(promoteResult)),
      claimStats
    }
  }
  return useQuery(["useUserInfo" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2RelationContract,
  })
}


export function useUserRewardInfo() {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const N2RelationContract = useN2RelationContract(N2Relation_ADDRESSSES)
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  async function fetchData() {

    if (!address || !N2RelationContract || !N2SWAPContract) {
      return
    }
    const usdtReward = await N2RelationContract.USDTReward(address)

    const dayID = await N2SWAPContract.dayID()
    const reserveAmount = await N2SWAPContract.reserveAmount(address, dayID)
    const myPreBalance = await N2SWAPContract.balance(address)
    const reserveAmountYestoday = await N2SWAPContract.reserveAmount(address, Number(dayID.toString()) - 1)
    const income = await N2SWAPContract.income(address)
    const reserveStats = await N2SWAPContract.reserveStats(address, dayID)
    const getAPrice = await N2SWAPContract.getAPrice()
    const totalGetAPrice = getAPrice * reserveAmount

    return {
      usdtReward: formatBalance(formatUnits(usdtReward)),
      reserveAmount: reserveAmount.toString(),
      myPreBalance: formatBalance(formatUnits(myPreBalance)),
      reserveAmountYestoday: reserveAmountYestoday.toString(),
      income: formatBalance(formatUnits(income)),
      reserveStats,
      totalGetAPrice: formatBalance(formatUnits(totalGetAPrice))
    }
  }
  return useQuery(["useUserRewardInfo" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2RelationContract && !!N2SWAPContract,
  })
}

export function useExtremeSwapInfo() {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2SWAPContract) {
      return
    }

    const getAPrice = await N2SWAPContract.getAPrice()
    const balance = await N2SWAPContract.balance(address)
    const dayID = await N2SWAPContract.dayID()
    const reserveStats = await N2SWAPContract.reserveStats(address, dayID)

    return {
      getAPrice: getAPrice,
      balance: balance,
      myPreBalance: formatUnits(balance),
      reserveStats
    }
  }
  return useQuery(["useExtremeSwapInfo" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2SWAPContract,
  })
}


export function usePointerPrice(amount: any) {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const N2NPOOLContract = useN2NPOOLContract(N2NPOOL_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2NPOOLContract || !amount) {
      return
    }
    const dailyLimit = await N2NPOOLContract.dailyLimit()
    const dayID = await N2NPOOLContract.dayID()
    const sellAmount = await N2NPOOLContract.sellAmount(dayID)
    const buyAmount = await N2NPOOLContract.buyAmount(dayID)
    let viewBuyPrice: any = ZERO_ADDRESS
    let viewSellPrice: any = ZERO_ADDRESS
    console.log(formatUnits(viewBuyPrice), 'viewBuyPrice')
    if (amount > dailyLimit - sellAmount) {
      viewSellPrice = await N2NPOOLContract.viewSellPrice(parseUnits(dailyLimit - sellAmount + ''))
    } else {
      viewSellPrice = await N2NPOOLContract.viewSellPrice(parseUnits(amount + ''))
    }
    if (amount > dailyLimit - buyAmount) {
      viewBuyPrice = await N2NPOOLContract.viewBuyPrice(parseUnits(dailyLimit - buyAmount + ''))
    } else {
      viewBuyPrice = await N2NPOOLContract.viewBuyPrice(parseUnits(amount + ''))

    }
    const maxBuyAmount = dailyLimit + sellAmount - buyAmount
    const maxSellAmount = dailyLimit + buyAmount - sellAmount

    return {
      viewBuyPrice: formatUnits(viewBuyPrice),
      viewSellPrice: formatUnits(viewSellPrice),
      maxBuyAmount: Number(formatUnits(maxBuyAmount)),
      maxSellAmount: Number(formatUnits(maxSellAmount)),
    }
  }
  return useQuery(["usePointerPrice" + address + amount], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2NPOOLContract,
  })
}


export function useNFTAmount() {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const N2FTContract = useN2FTContract(N2NFT_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2FTContract) {
      return
    }
    const balanceOf = await N2FTContract.balanceOf('0x904AF34F01D3bA83923557A453615EFa1CBD06Ca')
    return {
      balance: Number(balanceOf.toString())
    }
  }
  return useQuery(["useNFTAmount" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2FTContract,
  })
}


export function useNFTInfo(tokenID: string, initCycle: bigint, initDayID: bigint, sellPage: number) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const GNFTContract = useGNFTContract(GNFT_ADDRESSSES)
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  async function fetchData() {

    if (!address || !GNFTContract || !N2SWAPContract) {
      return
    }
    const tokenURI = await GNFTContract.tokenURI(tokenID)

    let nftimage = ''
    try {
      const nftInfo = await axios.get(tokenURI)
      nftimage = nftInfo.data.image
    } catch (error) {
      nftimage = '/images/nftdef.png'
    }

    const dayID = await N2SWAPContract.dayID()


    console.log('dayID====', dayID)
    console.log('initCycle==', initCycle)
    console.log('initDayID==', initDayID)

    const nftBuyPriceToday = await N2SWAPContract.nftBuyPrice(parseUnits('100'), Number(initCycle.toString()) + Number(dayID.toString()) - Number(initDayID.toString()))
    const nftSellPriceToday = await N2SWAPContract.nftSellPrice(parseUnits('100'), Number(initCycle.toString()) + Number(dayID.toString()) + 1 - Number(initDayID.toString()))

    let dayIdNumber = Number(dayID.toString())
    let nftSellPriceYestody = "0"
    let nftBuyPriceYestody = "0"

    if (dayIdNumber == 0) {
    } else {

      if (sellPage == -1) {
        dayIdNumber = dayIdNumber - 1
      } else {
        dayIdNumber = sellPage
      }

      console.log('dayIdNumber====', dayIdNumber)

      let dd = Number(initCycle.toString()) + dayIdNumber - Number(initDayID.toString())
      if (dd < 0) {
        dd = 0
      }
      const buyprice = await N2SWAPContract.nftBuyPrice(parseUnits('100'), dd)
      const sellprice = await N2SWAPContract.nftSellPrice(parseUnits('100'), dd + 1)
      nftBuyPriceYestody = formatUnits(buyprice)
      nftSellPriceYestody = formatUnits(sellprice)

    }

    return {
      nftImg: nftimage,
      tokenID: tokenID,
      nftBuyPriceToday: formatUnits(nftBuyPriceToday),
      nftSellPriceToday: formatUnits(nftSellPriceToday),
      nftBuyPriceYestody: nftBuyPriceYestody,
      nftSellPriceYestody: nftSellPriceYestody
    }
  }
  return useQuery(["useNFTInfo" + address + tokenID + initCycle + initDayID, sellPage], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!GNFTContract && !!N2SWAPContract,
  })
}

export function useTodayNFTInfo(tokenID: string, initCycle: bigint, initDayID: bigint) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id

  const GNFTContract = useGNFTContract(GNFT_ADDRESSSES)
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  async function fetchData() {

    if (!address || !GNFTContract || !N2SWAPContract) {
      return
    }
    const tokenURI = await GNFTContract.tokenURI(tokenID)
    const nftInfo = await axios.get(tokenURI)
    const dayID = await N2SWAPContract.dayID()
    const nftBuyPriceToday = await N2SWAPContract.nftBuyPrice(parseUnits('100'), Number(initCycle.toString()) + Number(dayID.toString()) - Number(initDayID.toString()))

    return {
      nftImg: nftInfo.data.image,
      nftName: nftInfo.data.name,
      nftBuyPriceToday: formatUnits(nftBuyPriceToday)
    }
  }
  return useQuery(["useTodayNFTInfo" + address + tokenID + initCycle + initDayID], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!GNFTContract && !!N2SWAPContract,
  })
}


export function useNFTListInfo() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id
  const NFTInfoList = useGetNFTInfoList()

  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  async function fetchData() {

    if (!address || !N2SWAPContract || NFTInfoList.isLoading || !NFTInfoList.data) {
      return
    }
    const getNFTInfoList = NFTInfoList.data.getNFTInfoList

    const dayID = await N2SWAPContract.dayID()
    const getNftOwnerList = await N2SWAPContract.getNftOwnerList(dayID)
    let totalNFTAmount = 0
    let totalNFTList: any[] = []
    if (Number(dayID.toString()) != 0) {
      const getNftOwnerListYes: any[] = await N2SWAPContract.getNftOwnerList(Number(dayID.toString()) - 1)

      getNftOwnerListYes.map((item: any, index: number) => {
        if (item == String(address)) {
          if (index <= getNFTInfoList.length - 1) {
            totalNFTAmount++
            totalNFTList.push([...getNFTInfoList[index], Number(dayID.toString()) - 1, index])
          }
        }
      })
    }

    let todayNFTList: any[] = []
    getNftOwnerList.map((item: string, index: number) => {
      if (item == String(address)) {
        todayNFTList.push([...getNFTInfoList[index], dayID, index])
      }
    })

    return {
      getNFTInfoList,
      getNftOwnerList,
      totalNFTAmount,
      todayNFTList,
      totalNFTList
    }
  }
  return useQuery(["useNFTListInfo" + address], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!N2SWAPContract && !!NFTInfoList.data,
  })
}


export function useNFTTodayTotalPrice() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id
  const nftListInfo = useNFTListInfo()

  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  async function fetchData() {

    if (!address || !N2SWAPContract || !nftListInfo.data || !chain) {
      return
    }

    const dayID = await N2SWAPContract.dayID()

    let totalAmount = 0
    let totalPrice = BigInt(0)
    let totalSellPrice = BigInt(0)
    let totalEran = BigInt(0)
    let nftBuyPrices: any = []
    let nftSellPrices: any = []
    for (let index = 0; index < nftListInfo.data.todayNFTList.length; index++) {
      const element = nftListInfo.data.todayNFTList[index];
      nftBuyPrices.push({
        address: N2SWAP_ADDRESSSES[chain?.id] as any,
        abi: N2SWAP_ABI as any,
        functionName: 'nftBuyPrice',
        args: [parseUnits('100'), Number(element[5].toString()) + Number(dayID.toString()) - Number(element[2].toString())],
      })
      nftSellPrices.push({
        address: N2SWAP_ADDRESSSES[chain?.id] as any,
        abi: N2SWAP_ABI as any,
        functionName: 'nftSellPrice',
        args: [parseUnits('100'), Number(element[5].toString()) + Number(dayID.toString()) + 1 - Number(element[2].toString())],
      })
    }

    const buyResults = await multicall(publicClient, {
      contracts: nftBuyPrices,
    })
    const sellResults = await multicall(publicClient, {
      contracts: nftSellPrices,
    })
    for (let index = 0; index < buyResults.length; index++) {
      const nftBuyPrice = buyResults[index].result as bigint
      const nftSellPrice = sellResults[index].result as bigint

      totalAmount++
      totalPrice += nftBuyPrice
      totalSellPrice += nftSellPrice
      totalEran += nftSellPrice - nftBuyPrice

    }

    return {
      totalAmount,
      totalPrice: formatUnits(totalPrice),
      totalEran: formatUnits(totalEran),
      totalSellPrice: formatUnits(totalSellPrice),
    }
  }
  return useQuery(["useNFTTodayTotalPrice" + address], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!N2SWAPContract && !!nftListInfo.data,
  })
}



export function useNFTYesTodayTotalPrice() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id
  const nftListInfo = useNFTListInfo()

  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  async function fetchData() {

    if (!address || !N2SWAPContract || !nftListInfo.data || !chain) {
      return
    }

    const dayID = await N2SWAPContract.dayID()

    let totalAmount = 0
    let totalPrice = BigInt(0)
    let totalSellPrice = BigInt(0)
    let totalEran = BigInt(0)
    let nftBuyPrices: any = []
    let nftSellPrices: any = []
    for (let index = 0; index < nftListInfo.data.totalNFTList.length; index++) {
      const element = nftListInfo.data.totalNFTList[index];
      let dd = Number(element[5].toString()) + Number(dayID.toString()) - 1 - Number(element[2].toString())
      if (dd < 0) {
        dd == 0
      }
      nftBuyPrices.push({
        address: N2SWAP_ADDRESSSES[chain?.id] as any,
        abi: N2SWAP_ABI as any,
        functionName: 'nftBuyPrice',
        args: [parseUnits('100'), dd],
      })
      nftSellPrices.push({
        address: N2SWAP_ADDRESSSES[chain?.id] as any,
        abi: N2SWAP_ABI as any,
        functionName: 'nftSellPrice',
        args: [parseUnits('100'), dd + 1],
      })
    }


    const buyResults = await multicall(publicClient, {
      contracts: nftBuyPrices,
    })
    const sellResults = await multicall(publicClient, {
      contracts: nftSellPrices,
    })

    for (let index = 0; index < buyResults.length; index++) {
      const nftBuyPrice = buyResults[index].result as bigint
      const nftSellPrice = sellResults[index].result as bigint

      totalAmount++
      totalPrice += nftBuyPrice
      totalSellPrice += nftSellPrice
      totalEran += nftSellPrice - nftBuyPrice
    }

    return {
      totalAmount,
      totalPrice: formatUnits(totalPrice),
      totalEran: formatUnits(totalEran),
      totalSellPrice: formatUnits(totalSellPrice),
    }
  }
  return useQuery(["useNFTYesTodayTotalPrice" + address], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!N2SWAPContract && !!nftListInfo.data,
  })
}



export function useNFTSellListInfo(dayid: number) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id
  const NFTInfoList = useGetNFTInfoList()

  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  async function fetchData() {

    if (!address || !N2SWAPContract || NFTInfoList.isLoading || !NFTInfoList.data) {
      return
    }

    const dayID = await N2SWAPContract.dayID()
    let totalNFTList: any[] = []
    if (Number(dayID.toString()) == 0) {
      return {
        totalNFTList: [],
        dayID: 0
      }
    }

    let day = Number(dayID.toString()) - 1
    if (dayid == day || dayid == -1) {
    } else {
      day = dayid
    }
    const getNFTInfoList = NFTInfoList.data.getNFTInfoList

    const getNftOwnerListYes: any[] = await N2SWAPContract.getNftOwnerList(day)

    getNftOwnerListYes.map((item: any, index: number) => {
      if (item == String(address)) {
        if (index <= getNFTInfoList.length - 1) {
          totalNFTList.push([...getNFTInfoList[index], day])
        }
      }
    })
    console.log('totalNFTList====', totalNFTList)


    return {
      totalNFTList,
      dayID: Number(dayID.toString())
    }
  }
  return useQuery(["useNFTSellListInfo" + address + dayid], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!N2SWAPContract && !!NFTInfoList.data,
  })
}


export function useNFTTotalPrice() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  async function fetchData() {

    if (!address || !N2SWAPContract) {
      return
    }
    const dayID = await N2SWAPContract.dayID()
    const myPreBalance = await N2SWAPContract.balance(address)
    const viewResaleSalePrice = await N2SWAPContract.viewResaleSalePrice(address, dayID)
    const totalNFTPrice = Number(formatUnits(viewResaleSalePrice))
    return {
      totalNFTPrice,
      total: totalNFTPrice + Number(formatUnits(myPreBalance))
    }
  }
  return useQuery(["useNFTTotalPrice" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2SWAPContract
  })
}



export function useMintNFTSellInfo() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  const N2NPOOLContract = useN2NPOOLContract(N2NPOOL_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2SWAPContract || !N2NPOOLContract) {
      return
    }
    const dayID = await N2SWAPContract.dayID()
    const getSaleTimesAndFee = await N2SWAPContract.getSaleTimesAndFee(address, dayID)

    const price = await N2NPOOLContract.price(Number(dayID.toString()) - 1)

    const payPoints = BigNumber(formatUnits(getSaleTimesAndFee[1])).div(formatUnits(price.toString())).times(0.98).toString()

    return {
      amount: getSaleTimesAndFee[0].toString(),
      fee: formatBalance(formatUnits(getSaleTimesAndFee[1])),
      payPoints: payPoints
    }
  }
  return useQuery(["useMintNFTSellInfo" + address], fetchData, {
    refetchInterval: RefreshConfig.shortRefreshInterval,
    enabled: !!address && !!N2SWAPContract && !!N2NPOOLContract
  })
}




export function useOwnerNFTInfoWithDay(dayid: number) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id
  const NFTInfoList = useGetNFTInfoList()

  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2SWAPContract || NFTInfoList.isLoading || !NFTInfoList.data) {
      return
    }
    const getNFTInfoList = NFTInfoList.data.getNFTInfoList

    const getNftOwnerList: any[] = await N2SWAPContract.getNftOwnerList(dayid)
    console.log('getNFTInfoList==', getNFTInfoList.length)
    console.log('getNftOwnerList==', getNftOwnerList.length)

    let ownerNFTList: any[] = []
    getNftOwnerList.map((item: any, index: number) => {
      if (index <= getNFTInfoList.length - 1) {
        ownerNFTList.push([...getNFTInfoList[index], item])
      }
    })
    console.log('ownerNFTList==', ownerNFTList[0])
    return {
      ownerNFTList
    }
  }
  return useQuery(["useOwnerNFTInfoWithDay" + dayid + address], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!N2SWAPContract && !!NFTInfoList.data,
  })
}

export function useOwnerNFTInfoWithDayInfo(dayid: number, tokenID: string, initCycle: bigint, initDayID: bigint) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2SWAPContract) {
      return
    }

    const nftBuyPrice = await N2SWAPContract.nftBuyPrice(parseUnits('100'), Number(initCycle.toString()) + dayid - Number(initDayID.toString()))
    const nftSellPrice = await N2SWAPContract.nftSellPrice(parseUnits('100'), Number(initCycle.toString()) + dayid + 1 - Number(initDayID.toString()))

    return {
      nftBuyPrice: formatUnits(nftBuyPrice),
      nftSellPrice: formatUnits(nftSellPrice)
    }
  }
  return useQuery(["useOwnerNFTInfoWithDayInfo" + address + dayid + tokenID + initCycle + initDayID], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!N2SWAPContract
  })
}

export function useGetNFTInfoList() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const networkId = chain?.id
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2SWAPContract) {
      return
    }
    const dayID = await N2SWAPContract.dayID()
    const result: any = await getRequest(GET_NFTINFO_LIST_URL + dayID.toString())
    return {
      getNFTInfoList: result.data.nftInfoList
    }
  }
  return useQuery(["useGetNFTInfoList" + address], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!N2SWAPContract,
    retry: 10
  })
}


export function useCurrentDayID() {
  const { chain } = useNetwork()
  const networkId = chain?.id
  const { address } = useAccount()
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2SWAPContract) {
      return
    }
    const dayID = await N2SWAPContract.dayID()
    console.log('dayID====', dayID)
    return {
      dayID: dayID.toString()
    }
  }
  return useQuery(["useCurrentDayID" + address], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!N2SWAPContract
  })
}
export function useBalance(address: any) {
  const { chain } = useNetwork()
  const networkId = chain?.id
  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)

  async function fetchData() {

    if (!address || !N2SWAPContract) {
      return
    }
    const dayID = await N2SWAPContract.dayID()
    console.log('dayID====', dayID)
    const balance = await N2SWAPContract.balance(address)
    return {
      balance: formatUnits(balance)
    }
  }
  return useQuery(["useBalance" + address], fetchData, {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!address && !!N2SWAPContract
  })
}
