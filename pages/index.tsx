import Layout from '@/components/layout';
import {
  initializeApollo,
  useApollo,
} from '../lib/apolloClient';
import {ALL_CATEGORIES, GET_CONTENT_CATEGORY} from '../services/GraphSchema';
import {
    Box,
    Button,
    Container,
    Divider,
    Image,
    Stack,
    useBreakpointValue,
    useColorMode,
    useMediaQuery,
  Spinner
} from "@chakra-ui/react";
import VisuallyHidden from "@reach/visually-hidden";
import {CategoryPost, GridPost, SliderPost} from "@/components/widgets";
import {bookPosts, lifePosts, musicPosts, socialPosts, sportPosts, teenPosts, trendingPosts} from "../data-sample";
import {vnSlugGenerator} from "../helpers/utils";
import {HorizontalCard} from "@/components/BlogCard";
import CategoryTitle from "../components/widgets/CategoryTitle";
import {IoAccessibilityOutline, IoMusicalNotesOutline, IoPeopleOutline, IoTimerOutline} from "react-icons/io5";
import {FaBasketballBall} from "react-icons/fa";
import {MdOndemandVideo} from "react-icons/md";
import {GiBlackBook} from "react-icons/gi";
import {IoIosPeople} from "react-icons/io";
import {useState} from "react";
import {nanoid} from "nanoid";
import {gql, useQuery} from "@apollo/client";
import FeaturedSection from "@/components/Home/FeaturedSection";
import SocialSection from "@/components/Home/SocialSection";
import TeenSection from "@/components/Home/TeenSection";
import LastedPostSection from "@/components/Home/LastedPostSection";

const posts = [
  {
    id: nanoid(),
    title: 'Người dân sẽ được tiêm vaccine ngừa Covid-19 miễn phí',
    imageUrl:
        'https://znews-photo.zadn.vn/w960/Uploaded/ovhpaob/2021_02_23/Viet_Hung_Xet_nghiem_nguoi_ve_tu_vung_dich_phuong_Vinh_Tuy1.jpg',
    category: 'Xã hội',
    description: `Ban Chỉ đạo quốc gia cho biết về lâu dài, người dân sẽ được tiêm vaccine ngừa Covid-19 miễn phí. Một phần nhỏ vaccine dịch vụ sẽ dành cho những người có khả năng chi trả cao hơn.`,
    publishDate: 'Thứ 5, 20/10/2020',
  },
  {
    id: nanoid(),

    title: 'Hà Nội còn 4 điểm phong tỏa liên quan Covid-19',
    imageUrl:
        'https://znews-photo.zadn.vn/w360/Uploaded/lexw/2021_02_08/thumb.jpg',
    category: 'Đời sống',
    description: `Sau hơn một tuần không ghi nhận ca mắc Covid-19 mới, Hà Nội đã dỡ bỏ 14 điểm phong tỏa. Điểm phong tỏa cuối cùng dự kiến kết thúc vào ngày 1/3 nếu không có trường hợp mắc mới.`,
    publishDate: 'Thứ 5, 20/10/2020',
  },
  {
    id: nanoid(),

    title: 'Rosamund Pike - từ lời từ chối cởi đồ đến ‘đóa hồng gai’ nước Anh',
    imageUrl:
        'https://znews-photo.zadn.vn/w360/Uploaded/aobovhp/2021_02_23/rosamund_pike_1534409574.jpg',
    category: 'Giải trí',
    description: `Sau thành công với bộ phim “Gone Girl” hồi 2014, Rosamund Pike có màn tái xuất ấn tượng qua hình ảnh nhân vật chính máu lạnh trong “I Care a Lot”`,
    publishDate: 'Thứ 5, 20/10/2020',
  },
  {
    id: nanoid(),

    title: 'Tự vệ cảm xúc 4.0’ và cách sống an toàn trên mạng xã hội',
    imageUrl:
        'https://znews-photo.zadn.vn/w860/Uploaded/mdf_fedrei/2021_02_21/tu_ve_cam_xuc_4.jpg',
    category: 'Cuộc sống',
    description: `Thực tế cho thấy không nhiều người biết bảo vệ mình trước những “anh hùng bàn phím” hay kẻ ác ý trên mạng xã hội...`,
    publishDate: 'Thứ 5, 20/10/2020',
  },
];


const Home = (props) => {
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const headingSizes = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'md',
  });
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const loadmoreLastedPost = () => {
    setIsLoading(true);
    const timeOut = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeOut);
  };

    return (
      <>
        <FeaturedSection/>
        <LastedPostSection />
        <TeenSection />
        <SocialSection />
        <Container maxW="1170px" as={`section`} mb={8}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
            <Box flexGrow={1}>
              <CategoryTitle
                  title={`Thể thao`}
                  icon={
                    <FaBasketballBall
                        fontSize={`2rem`}
                        color={colorMode === 'light' ? '#000' : '#c9c9c9'}
                    />
                  }
                  headingProps={{
                    as: `h2`,
                    size: `lg`,
                    fontWeight: `light`,
                  }}
              />
              {sportPosts.map((post, index) =>
                  index === sportPosts.length - 1 ? (
                      <Box key={`${index}`}>
                        <HorizontalCard
                            post={{ ...post, slug: vnSlugGenerator(post.title) }}
                            showCategory={true}
                            headingProps={{
                              size: headingSizes,
                              as: `h3`,
                            }}
                        />
                      </Box>
                  ) : (
                      <Box mb={8} key={`${index}`}>
                        <HorizontalCard
                            post={{ ...post, slug: vnSlugGenerator(post.title) }}
                            showCategory={true}
                            headingProps={{
                              size: headingSizes,
                              as: `h3`,
                            }}
                        />
                      </Box>
                  )
              )}
            </Box>
            {!isLargerThan768 && <Divider mt={8} />}
            <Box
                w={{ lg: 350, base: `100%` }}
                flexShrink={{ lg: 0, base: 1 }}
                position={`relative`}
            >
              <Box mb={8}>
                <CategoryTitle
                    title={`Video bóng đá`}
                    icon={
                      <MdOndemandVideo
                          fontSize={`2rem`}
                          color={colorMode === 'light' ? '#000' : '#c9c9c9'}
                      />
                    }
                    headingProps={{
                      as: `h2`,
                      size: `lg`,
                      fontWeight: `light`,
                    }}
                />
                {socialPosts.map((post, index) => (
                    <Box mb={8} key={`${index}`}>
                      <HorizontalCard
                          post={{ ...post, slug: vnSlugGenerator(post.title) }}
                          showCategory={true}
                          showDescription={false}
                          headingProps={{
                            as: `h3`,
                            size: `sm`,
                          }}
                          spacing={4}
                          type={'video'}
                      />
                    </Box>
                ))}
              </Box>
              <Box pos={`sticky`} top={16}>
                <Image
                    src={`https://via.placeholder.com/300x300/f9f9f9/?text=300x300+Advertiser`}
                    width={`100%`}
                />
              </Box>
            </Box>
          </Stack>
          <Divider mt={8} />
        </Container>
        <Container maxW="1170px" as={`section`}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
            <Box position={`relative`} flex={1}>
              <Box mb={8}>
                <CategoryTitle
                    title={`Book`}
                    icon={
                      <GiBlackBook
                          fontSize={`2rem`}
                          color={colorMode === 'light' ? '#000' : '#c9c9c9'}
                      />
                    }
                    headingProps={{
                      as: `h2`,
                      size: `lg`,
                      fontWeight: `light`,
                    }}
                />
                <CategoryPost
                    posts={bookPosts.map((post) => ({
                      ...post,
                      slug: vnSlugGenerator(post.title),
                    }))}
                    limit={5}
                    loading={false}
                />
              </Box>
              {!isLargerThan768 && <Divider mt={8} />}
            </Box>
            <Box position={`relative`} flex={1}>
              <Box mb={8}>
                <CategoryTitle
                    title={`Đời sống`}
                    icon={
                      <IoIosPeople
                          fontSize={`2rem`}
                          color={colorMode === 'light' ? '#000' : '#c9c9c9'}
                      />
                    }
                    headingProps={{
                      as: `h2`,
                      size: `lg`,
                      fontWeight: `light`,
                    }}
                />
                <CategoryPost
                    posts={lifePosts.map((post) => ({
                      ...post,
                      slug: vnSlugGenerator(post.title),
                    }))}
                    limit={5}
                    loading={false}
                />
              </Box>
              {!isLargerThan768 && <Divider mt={8} />}
            </Box>

            <Box position={`relative`} flex={1}>
              <Box mb={8}>
                <CategoryTitle
                    title={`Âm nhạc`}
                    icon={
                      <IoMusicalNotesOutline
                          fontSize={`2rem`}
                          color={colorMode === 'light' ? '#000' : '#c9c9c9'}
                      />
                    }
                    headingProps={{
                      as: `h2`,
                      size: `lg`,
                      fontWeight: `light`,
                    }}
                />
                <CategoryPost
                    posts={musicPosts.map((post) => ({
                      ...post,
                      slug: vnSlugGenerator(post.title),
                    }))}
                    limit={5}
                    loading={false}
                />
              </Box>
            </Box>
          </Stack>
        </Container>
      </>
  );
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const resCats = await apolloClient.query({
    query: ALL_CATEGORIES,
  });
  let paths = [];
  for (const cat of resCats.data.categories) {
    const posts = await apolloClient.query({
      query: GET_CONTENT_CATEGORY,
      variables: {
        where: {
          categoryId: cat.id
        },
        limit: 30
      }
    });
    paths = [...paths, ...posts.data.getLastedPost.map(post => ({
      params: {
        slug: post.slug
      }
    }))]
  }

  console.log({paths});
  return {
    paths,
    fallback: false // See the "fallback" section below
  };
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const resCats = await apolloClient.query({
    query: ALL_CATEGORIES,
  });
  for (const cat of resCats.data.categories) {
    await apolloClient.query({
      query: GET_CONTENT_CATEGORY,
      variables: {
        where: {
          categoryId: cat.id
        },
        limit: 10
      }
    })
  }
  return {
      props: {
          initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 60
  }
}
//
Home.layout = Layout;

export default Home;
