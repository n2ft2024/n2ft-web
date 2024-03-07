export function isBraveWallet(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state){
    return true
  }
  return false
}

export function isApexWallet(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isApexWallet){
    return true
  }
  return false
}

export function isAvalanche(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isAvalanche){
    return true
  }
  return false
}

export function isBackpack(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isBackpack){
    return true
  }
  return false
}

export function isBifrost(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isBifrost){
    return true
  }
  return false
}

export function isBitKeep(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isBitKeep){
    return true
  }
  return false
}

export function isBitski(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isBitski){
    return true
  }
  return false
}

export function isBlockWallet(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isBlockWallet){
    return true
  }
  return false
}

export function isCoinbaseWallet(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isCoinbaseWallet){
    return true
  }
  return false
}

export function isDawn(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isDawn){
    return true
  }
  return false
}

export function isEnkrypt(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isEnkrypt){
    return true
  }
  return false
}

export function isExodus(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isExodus){
    return true
  }
  return false
}

export function isFrame(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isFrame){
    return true
  }
  return false
}

export function isFrontier(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isFrontier){
    return true
  }
  return false
}

export function isGamestop(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isGamestop){
    return true
  }
  return false
}

export function isHyperPay(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isHyperPay){
    return true
  }
  return false
}

export function isImToken(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isImToken){
    return true
  }
  return false
}

export function isKuCoinWallet(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isKuCoinWallet){
    return true
  }
  return false
}

export function isMathWallet(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isMathWallet){
    return true
  }
  return false
}

export function isOkxWallet(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.okexchain){
    return true
  }
  return false
}

export function isOneInchIOSWallet(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isOneInchIOSWallet || ethereum.isOneInchAndroidWallet){
    return true
  }
  return false
}

export function isOpera(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isOpera){
    return true
  }
  return false
}

export function isPhantom(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isPhantom){
    return true
  }
  return false
}

export function isPortal(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isPortal){
    return true
  }
  return false
}

export function isRabby(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isRabby){
    return true
  }
  return false
}

export function isRainbow(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isRainbow){
    return true
  }
  return false
}

export function isStatus(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isStatus){
    return true
  }
  return false
}

export function isTally(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isTally){
    return true
  }
  return false
}

export function isTokenPocket(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isTokenPocket){
    return true
  }
  return false
}

export function isTokenary(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isTokenary){
    return true
  }
  return false
}

export function isTrust(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isTrust || ethereum.isTrustWallet){
    return true
  }
  return false
}

export function isXDEFI(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isXDEFI){
    return true
  }
  return false
}

export function isZerion(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isZerion){
    return true
  }
  return false
}

export function isCoin98(ethereum:any){
  if (!ethereum){
    return false
  }
  if (ethereum.isCoin98){
    return true
  }
  return false
}

export function isMetaMask(ethereum:any) {
  if (!ethereum){
    return false
  }
  if (ethereum.isMetaMask)
    return true;
  return false;
}