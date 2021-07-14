import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
require('dayjs/locale/vi');
dayjs.extend(updateLocale);

const localeConfig = {
  weekdays: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
};

dayjs.updateLocale('vi', localeConfig);

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

export const formatUnixDate = (
  unixTime: number,
  customFormat = 'DD/MM/YYYY'
) => {
  if (isNaN(unixTime)) return '';
  return dayjs.unix(unixTime).locale('vi').format(customFormat);
};
