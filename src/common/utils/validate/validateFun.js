// 密码规则
export const passwordExp = (val) => {
  const regUpper = /[A-Za-z]/;
  const regNum = /[0-9]/;
  const regTeShu = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]"
  );
  let complex = 0;
  if (regUpper.test(val)) {
    ++complex;
  }
  if (regNum.test(val)) {
    ++complex;
  }
  if (regTeShu.test(val)) {
    ++complex;
  }
  return !(complex < 2 || val.length < 8 || val.length > 15);
  // if (complex < 2 || val.length < 8 || val.length > 15) {
  //   return false
  // } else {
  //   return true
  // }
};
