import { fromUnixTime, format } from 'date-fns'
import {default as vnLocale} from 'date-fns/locale/vi'



export const vnSlugGenerator = (str: string, separator: string = '-') => {
  str = str
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^A-Za-z0-9_-]/g, '')
    .replace(/-+/g, '-');
  return str.replace(/-/g, separator);
};

export const getDocsHeight = () => {
  const D = document || window.document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
};

export const checkScrollReachBottom = () => {
  return window.innerHeight + window.pageYOffset >= getDocsHeight();
};

export function getStrapiURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:3030'
  }/v1${path}`;
}

export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export const formatUnixDate = (unixTime, customFormat = 'EEEE, dd/MM/yyyy') => {
  if(isNaN(unixTime)) return '';
  const date = fromUnixTime(unixTime);
  return format(date, customFormat, { locale: vnLocale })
}
