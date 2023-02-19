import {
  mobile,
  name,
  positiveInteger,
  phoneNumber,
  naturalNumber,
  IDNumber,
  numberBetween
} from "./validateExp";
import { passwordExp } from "./validateFun";
export default {
  install(Vue, options) {
    // 密码格式验证
    const isvalidatePassword = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (!passwordExp(value)) {
          // callback(new Error('密码长度需8-15位(包含数字、英文字符、特殊字符中的两种)'))
          callback(new Error("8到15位（数字/字母/特殊符号中的两种）"));
        } else {
          callback();
        }
      }
    };
    // 验证身份证号
    const isvalidateIDNumber = (rule, value, callback) => {
      if (value !== null && value !== "") {
        if (!IDNumber.test(value)) {
          callback(new Error("您输入的身份证号不正确"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    /* 验证手机号 */
    const isvalidateMobile = (rule, value, callback) => {
      if (value !== null && value !== "") {
        value = value.trim();
        if (!mobile.test(value)) {
          callback(new Error("您输入的手机号不正确"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    /* 验证有效的电话号码，包括手机号码和座机号码 */
    const isvalidatePhoneNumber = (rule, value, callback) => {
      if (value !== null && value !== "") {
        if (!phoneNumber.test(value)) {
          callback(new Error("您输入的电话号码不正确"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    /* 含有非法字符(只能输入字母、汉字) */
    const isvalidateName = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (!name.test(value)) {
          callback(new Error("含有非法字符(只能输入字母、汉字)"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    /* 只能输入正整数 */
    const isvalidatePositiveInteger = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (!positiveInteger.test(value)) {
          callback(new Error("含有非法字符(只能输入正整数)"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    /* 只能输入1-20的正整数 */
    const isvalidateNumberBetween = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (!numberBetween.test(value)) {
          callback(new Error("超出范围(只能输入1-20的正整数)"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    /* 不能都是空格 */
    const nonEmpty = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (value.trim().length === 0) {
          callback(new Error("内容不能为空"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    /* 只能输入自然数（正整数+0） */
    const isvalidateNaturalNumber = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (!naturalNumber.test(value)) {
          callback(new Error("含有非法字符(只能输入0或正整数)"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    /* 数字在某个区间内 */
    const isvalidateNumberMagnitude = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (!naturalNumber.test(value)) {
          callback(new Error("含有非法字符(只能输入0或正整数)"));
        } else if (value < 0 || value > 120) {
          callback(new Error(`数字应该在0与120之间`));
        }
      } else {
        callback();
      }
    };

    /* 数字在某个区间内 */
    const isvalidateNumberMagnitude100 = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (!naturalNumber.test(value)) {
          callback(new Error("含有非法字符(只能输入0或正整数)"));
        } else if (value < 0 || value > 100) {
          callback(new Error(`数字应该在0与100之间`));
        }
      } else {
        callback();
      }
    };
    /**
     * 参数 item
     * required true  必填项
     * maxLength  字符串的最大长度
     * min 和 max 必须同时给 min < max  type=number
     * type 手机号 mobile
     *      邮箱   email
     *      网址   url
     *      各种自定义类型   定义在 src/utils/validate 中    持续添加中.......
     * */

    Vue.prototype.filterRules = function (item) {
      let rules = [];
      if (item.required) {
        rules.push({
          required: item.required,
          message: item.message
        });
      }
      if (item.max) {
        rules.push({
          max: item.max,
          message: item.maxMess
        });
      }
      if (item.validator) {
        rules.push({
          validator: item.validator
        });
      }
      if (item.type) {
        let type = item.type;
        switch (type) {
          case "password":
            rules.push({ validator: isvalidatePassword });
            break;
          case "IDNumber":
            rules.push({ validator: isvalidateIDNumber });
            break;
          case "numberLimit":
            rules.push({ validator: isvalidateNumberMagnitude });
            break;
          case "numberLimit100":
            rules.push({ validator: isvalidateNumberMagnitude100 });
            break;
          case "mobile":
            rules.push({ validator: isvalidateMobile });
            break;
          case "name":
            rules.push({ validator: isvalidateName });
            break;
          case "positiveInteger":
            rules.push({ validator: isvalidatePositiveInteger });
            break;
          case "phoneNumber":
            rules.push({ validator: isvalidatePhoneNumber });
            break;
          case "naturalNumber":
            rules.push({ validator: isvalidateNaturalNumber });
            break;
          case "nonEmpty":
            rules.push({ validator: nonEmpty });
            break;
          case "numberBetween":
            rules.push({ validator: isvalidateNumberBetween });
            break;
          default:
            rules.push({});
            break;
        }
      }
      return rules;
    };
  }
};
