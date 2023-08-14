/*========================================= validation through useFrom ================================= */

import moment from "moment";
//import { MobileObject } from "../containers/home/UserListing/EditUser";

type ValidationObject = {
  value: RegExp;
  message: string;
};

export const validateAplhabetsOnly = (
  validMassage: string
): ValidationObject => {
  return {
    value: /^[A-Za-z]+$/,
    message: validMassage,
  };
};

export const validateNumberOnly = (validMassage: string): ValidationObject => {
  return {
    value: /^[0-9]+$/,
    message: validMassage,
  };
};

export const validateEmail = (validMassage: string): ValidationObject => {
  return {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: validMassage,
  };
};

export const validateDecimal = (validMassage: string): ValidationObject => {
  return {
    value: /^[0-9]*(\.[0-9]{0,2})?$/,
    message: validMassage,
  };
};
export const validateDomain = (validMassage: string): ValidationObject => {
  return {
    value: /([a-z0-9|-]+\.)*[a-z0-9|-]+\.[a-z]+/,
    message: validMassage,
  };
};

export const validateInteger = (validMassage: string): ValidationObject => {
  return {
    value: /^\d+$/,
    message: validMassage,
  };
};

export const validateDecimalWeight = (
  validMassage: string
): ValidationObject => {
  return {
    value: /^[0-9]*(\.[0-9]{0,4})?$/,
    message: validMassage,
  };
};

export const validatePassword = (validMassage: string): ValidationObject => {
  return {
    value:
    /^(?=.*[0-9])/,
    message: validMassage,
  };
};

/* ======================================== Manual Validation =========================================== */
/* ======================================= For Controlled Form ========================================= */

/**
 * Validate string using regex.
 * Accept aphabets and space.
 * @param value
 * @returns
 */
export const validateStateOrCity = (value: string): RegExpMatchArray | null => {
  return value.match(/^[a-zA-Z ]*$/);
};

/**
 * Validate string using regex.
 * Accept only aphabets.
 * @param value
 * @returns
 */
export const validateName = (value: string): RegExpMatchArray | null => {
  return value.match(/^[a-zA-Z]*$/);
};

/**
 * Validate string using regex.
 * Accept only numbers.
 * @param value
 * @returns
 */
export const validateNumber = (value: string): RegExpMatchArray | null => {
  return value.match(/^[0-9]+$/);
};

/**
 * This Email validation function is used in controled components.
 */
export const validateEmailControlled = (
  value: string
): RegExpMatchArray | null => {
  return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
};

/**
 * validate controlled component.
 * @param mobileNo
 * @returns
 */
export const validateMobileNumber = (mobileNo: string | undefined) => {
  if (mobileNo === "" || mobileNo === undefined) {
    return { mobileError: true };
  } else if (!validateNumber(mobileNo)) {
    return { mobileValidError: true, mobileError: false };
  } else if (mobileNo?.length > 10) {
    return {
      mobileMaxLengthError: true,
      mobileValidError: false,
      mobileError: false,
    };
  } else if (mobileNo?.length < 10) {
    return {
      mobileMinLengthError: true,
      mobileValidError: false,
      mobileError: false,
    };
  } else if (mobileNo?.length === 10) {
    return {
      mobileMinLengthError: false,
      mobileValidError: false,
      mobileError: false,
      mobileMaxLengthError: false,
    };
  } else {
    return {
      mobileMaxLengthError: false,
      mobileMinLengthError: false,
      mobileValidError: false,
      mobileError: false,
    };
  }
};

/**
 * this function is used to show date today yesterday and date
 * @param date
 * @returns
 */
export const timeFormatter = (d: Date): string => {
  // const timeString = time ? ', ' + formatHours(d) : '';
  let dateString = d.getDate() + "-" + d.getMonth() + 1 + "-" + d.getFullYear();
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (
    d.getDate() === today.getDate() &&
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth()
  ) {
    dateString = "Today";
  } else if (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  ) {
    dateString = "Yesterday";
  } else {
    dateString = moment(d).format("MMM DD");
  }
  return dateString; //.toString().slice(-2)+ timeString
};

export const timeMonthFormatter = (d: Date): string => {
  // const timeString = time ? ', ' + formatHours(d) : '';
  let dateString = d.getDate() + "-" + d.getMonth() + 1 + "-" + d.getFullYear();
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (
    d.getDate() === today.getDate() &&
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth()
  ) {
    dateString = "Today";
  } else if (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  ) {
    dateString = "Yesterday";
  } else {
    dateString = moment(d).format("MMM DD, YYYY");
  }
  return dateString; //.toString().slice(-2)+ timeString
};
export const timeMonthFromDateFormatter = (d: Date, day = ""): string => {
  if (["due_on_receipt"].indexOf(day) > -1) {
    return "";
  }

  if (["fixed_date"].indexOf(day) > -1) {
    return moment(d).format("MMM DD, YYYY");
  }

  const newDate = moment(d)
    .add(day.replace("_days", ""), "d")
    .format("MMM DD, YYYY");

  const dateString = moment(newDate).format("MMM DD, YYYY");
  return dateString; //.toString().slice(-2)+ timeString
};

export const showDateTimeFormat = (d: Date): string => {
  return moment(d).format("MMM DD, YYYY") + " at " + moment(d).format("LT");
};

export const showOrderDateTimeFormat = (d: any): string => {
  return moment(d).format("DD MMM (dddd)");
};

export const encodeData = (data: any) => {
  return Object.keys(data)
    .map(function (key) {
      return [key, data[key]].map(encodeURIComponent).join("=");
    })
    .join("&");
};
