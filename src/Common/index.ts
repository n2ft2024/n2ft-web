import { isMobile } from 'react-device-detect';

export const colors = {
  main: '#BAFF00',
  active: '#ECB91A',
}

export const RefreshConfig:any = {
  refreshInterval:20 * 1000,
  longRefreshInterval: 1000 * 60 * 10,
  shortRefreshInterval: 1000 * 60 * 1
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const COUNTDOWN_TIME = '2024-01-01 14:00:00'

export const swapTokens:any = [
]

export function formatFullNum(num:number){
  if (isNaN(num)) return num
  let str = '' + num
  if(!/e/i.test(str)) return num
  return (num).toFixed(18).replace(/\.?0+$/,"")
}
export function formatBalance(s: string | number, decimals = 4): string {
    const init = 0;
    if (isNaN(Number(s))) {
        return floorFixed(init, decimals).toString()
    }
    return s ? floorFixed(s, decimals).toString() : floorFixed(init, decimals).toString()
}

export function floorFixed(s: string | number, decimals = 4) {
    s = Number(s)
    return Math.floor(s * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export function formatPercent(s: string | number, decimals = 2): string {
    if (Number(s) / 100 > 999999) {
        return '999999%'
    }
    return s ? (Number(s) * 100).toFixed(decimals) + '%' : '0%'
}

export enum ApprovalState {
    UNKNOWN,
    NOT_APPROVED,
    PENDING,
    APPROVED
}

export function formatAccount(account: string | undefined, decimals = 4) {
    if (!account) {
        return ""
    }
    if (account == ZERO_ADDRESS) {
        return ""
    }
    return account.slice(0, decimals) + '****' + account.slice(-decimals);
}


export function getDeadLine(min = 20) {
    return "0x" + (Math.floor(new Date().getTime() / 1000) + min * 60).toString(16)
}


export function timeToH_M_S(time: number) {
    const check = (num: number) => {
        if (num < 10) {
            return '0' + num
        }
        return num
    }
    let min = Math.floor(time % 3600);
    return check(Math.floor(time / 3600)) + ':' + check(Math.floor(min / 60)) + ':' + check(time % 60)
}

export const GasInfo = {
    gasLimit: 1500000
}

export function autoWidthVW(width: number) {
    if (isMobile) {
        // return width+"px"
        return width / 375 * 100 + "vw"
    }
    return width/1920*1440 + 'px'
    // return width/1440*1440 + 'px'
    // return width / 1920 * 100 + "vw"
}



export function trim(number = 0, precision = 0) {
    // why would number ever be undefined??? what are we trimming?
    const array = Number(number).toFixed(8).split(".");
    if (array.length === 1) return number.toString();
    if (precision === 0) return array[0].toString();

    const poppedNumber = array.pop() || "0";
    array.push(poppedNumber.substring(0, precision));
    const trimmedNumber = array.join(".");
    return trimmedNumber;
}

export function padString(str: string | undefined | number, decimals = 4) {
    if (!str) {
        return ''
    }
    return String(str).padStart(decimals, '0')
}

export function getCardNo(no: string | number) {
    return Number(Number(no) * 999).toString(21).toUpperCase()
}

export function scrollToAnchor(anchorName: string) {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
    }
}

export function equalAddress(a:string,b:string){
    return String(a).toUpperCase() === String(b).toUpperCase();
}

export function isAndroid() {
  return typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);
}
export function isSmallIOS() {
  return typeof navigator !== "undefined" && /iPhone|iPod/.test(navigator.userAgent);
}
export function isLargeIOS() {
  return typeof navigator !== "undefined" && (/iPad/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
export function isIOS() {
  return isSmallIOS() || isLargeIOS();
}
export function nFormatter(num:string | number, digits = 4) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return Number(num) >= Number(item.value);
  });
  return item ? (Number(num) / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export function formatNumber(value:string | number,decimals = 4){
  const n = Number(value) * Math.pow(10, 6)
  if (n < 1){
    return Number(value).toExponential(4)
  }else {
    if (Number(value) < 1){
      return formatBalance(value,7)
    }
    return nFormatter(value, decimals)
  }
}