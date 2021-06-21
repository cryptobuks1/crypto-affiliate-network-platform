function randStr(n = 10) {
  const runes =
    "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm123456789".split("");
  let str = "";

  for (let i = 0; i < n; i++) {
    str += runes[Math.floor(Math.random() * runes.length)];
  }

  return str;
}

export default randStr;
