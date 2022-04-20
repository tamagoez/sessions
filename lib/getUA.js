import dynamic from 'next/dynamic'
export default function getUA() {
  if (process.brower){
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        return true;
    } else {
        return false;
    }
  } else {
      return true;
  }
}