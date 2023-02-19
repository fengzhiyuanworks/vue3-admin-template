// 加密与解密方法
import cryptoJs from "crypto-js";

// 如果需要配合后台加减密，下面的密钥和偏移量需要使用后台得到的
const baseKey = "123456789ABCDEFG"; // 十六位十六进制数，作为密钥
const baseIv = "ABCDEFG123456789"; // 十六位十六进制数，作为密钥偏移量

// 解密方法
export function decrypt(word, key = baseKey, iv = baseIv) {
  let keyObj = cryptoJs.enc.Utf8.parse(key);
  let ivObj = cryptoJs.enc.Utf8.parse(iv);
  let encryptedHexStr = cryptoJs.enc.Hex.parse(word);
  let srcs = cryptoJs.enc.Base64.stringify(encryptedHexStr);
  let decrypt = cryptoJs.AES.decrypt(srcs, keyObj, {
    iv: ivObj,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(cryptoJs.enc.Utf8);
  return decryptedStr.toString();
}

// 加密方法
export function encrypt(word, key = baseKey, iv = baseIv) {
  let keyObj = cryptoJs.enc.Utf8.parse(key);
  let ivObj = cryptoJs.enc.Utf8.parse(iv);
  let srcs = cryptoJs.enc.Utf8.parse(word);
  let encrypted = cryptoJs.AES.encrypt(srcs, keyObj, {
    iv: ivObj,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}
