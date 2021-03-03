const title = 'Trang tin tức tổng hợp';
const description =
  'Cập nhật tin tức mới và nóng nhất về Đời sống - Xã hội, Kinh tế, Thế giới, Thể thao, Giải trí, Công nghệ và nhiều lĩnh vực khác…';
const keywords =
  'Yeah1, Tin tức, Báo, Việt Nam, Hà Nội, Hồ Chí Minh, Đà Nẵng, Đời sống, Phóng sự, Pháp luật, Thế giới, Khám phá, Thị trường, Chứng khoán, Kinh tế, Bất động sản, Giáo dục, Tuyển sinh, Teen, Thể thao, Ngoại hạng, Champion, La liga, Công nghệ, điện thoại, Oto, Xe Máy, Giải trí, Showbiz, Sao Việt, Âm nhạc, VPOP, KPOP, Phim ảnh, Điện ảnh, Đẹp, Thời trang, Làm đẹp, Người Đẹp, Tình yêu, Du lịch, Ẩm thực, Sách, Cười';
const SEO = {
  title,
  description,
  canonical: 'https://yeah1media.vn',
  titleTemplate: 'Yeah1 Media | %s',
  keywords,
  openGraph: {
    type: 'website',
    locale: 'vi_IE',
    url: 'https://yeah1media.vn',
    title,
    description,
    images: [
      {
        url: '/logo-light-mode.png',
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default SEO;
