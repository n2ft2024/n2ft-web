import { useQuery } from 'react-query';
import { fetchBalance } from '@wagmi/core';
import { ApprovalState, RefreshConfig } from '@/Common';
import { LoadingContext, LoadingType } from '@/provider/loadingProvider';
import { useContext, useState, useEffect, useCallback } from 'react';
import { AddressMap } from './../Contract/addresses';
import { Address, useAccount, useContractRead, useNetwork, useContractWrite } from "wagmi";
import ERC_20_ABI from '../ABI/ERC20.json'
import { BigNumberish, MaxInt256, TransactionResponse, formatUnits, parseUnits } from 'ethers'
import walletTokens from '@/Contract/walletTokens';
import { useTokenContract } from './useContract';

export function useTokenAllowance(tokenAddress: AddressMap, contractAddress: AddressMap) {
  const { chain = { id: 1 } } = useNetwork()
  const { address } = useAccount()
  return useContractRead({
    address: tokenAddress[chain.id as keyof AddressMap] as Address,
    abi: ERC_20_ABI,
    functionName: 'allowance',
    args: [address, contractAddress[chain.id as keyof AddressMap]]
  })
}

export function useApprove(tokenAddressMap: AddressMap, spenderAddressMap: AddressMap, cost?: string | number): [ApprovalState, () => Promise<void>] {
  const loading = useContext(LoadingContext)
  const { address } = useAccount()
  const { chain = { id: 1 } } = useNetwork()
  const tokenContract = useTokenContract(tokenAddressMap)
  const { data: allowanceData, refetch } = useTokenAllowance(tokenAddressMap, spenderAddressMap);

  const [approvalState, setApproveState] = useState(ApprovalState.UNKNOWN);
  useEffect(() => {
    if (allowanceData == undefined || allowanceData == null) {
      setApproveState(ApprovalState.UNKNOWN);
    } else {
      const allowance = Number(formatUnits(allowanceData as bigint))
      if (allowance == 0 || allowance < Number(cost)) {
        setApproveState(ApprovalState.NOT_APPROVED);
      } else {
        setApproveState(ApprovalState.APPROVED);
      }
    }
  }, [allowanceData, cost])

  const approve = useCallback(async (): Promise<void> => {
    if (!address) {
      return
    }
    const contractAddress = spenderAddressMap[chain.id as keyof typeof spenderAddressMap];
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }
    if (!contractAddress) {
      console.error("Contract doesn't exist on current network. Please switch networks.")
      return
    }
    if (!tokenContract) {
      console.error("Token doesn't exist on current network. Please switch networks.")
      return
    }
    setApproveState(ApprovalState.PENDING);
    loading.show(LoadingType.pending, "Approve")
    tokenContract.approve(contractAddress, MaxInt256)
      .then(async (response: TransactionResponse) => {
        loading.show(LoadingType.pending, response.hash)
        await response.wait();
        loading.show(LoadingType.success, response.hash)
        setApproveState(ApprovalState.APPROVED);
        refetch()
      })
      .catch((err: any) => {
        setApproveState(ApprovalState.NOT_APPROVED);
        loading.show(LoadingType.error, err.data?.message || err.message)
      })
  }, [approvalState, tokenAddressMap, spenderAddressMap, cost, tokenContract]);
  return [approvalState, approve];
}

export function useWalletInfo() {
  const { address } = useAccount()
  const { chain = { id: 56 } } = useNetwork()

  async function fetchData() {
    if (!address) {
      return
    }
    let walletBalance: any = {}
    const balance = await fetchBalance({
      address
    })
    walletBalance["nativeCurrency"] = balance.formatted
    for (let index = 0; index < walletTokens.length; index++) {
      const element = walletTokens[index];
      const tokenBalance = await fetchBalance({
        address,
        token: element.address[chain.id as keyof AddressMap] as Address,
      })
      walletBalance[element.name] = tokenBalance.formatted
    }
    return walletBalance
  }
  return useQuery(['useWalletInfo' + address], fetchData, {
    enabled: !!chain.id && !!address,
    refetchInterval: RefreshConfig.refreshInterval,
  })
}
