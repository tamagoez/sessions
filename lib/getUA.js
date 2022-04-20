import dynamic from 'next/dynamic'
export default function getUA() {
  if (process.browser){
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        console.info("[getUA] detect smartphone")
        return true;
    } else {
        console.info("[getUA] detect not samrtphone")
        return false;
    }
  } else {
      console.info("[getUA] detect render process")
      return true;
  }
}