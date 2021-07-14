import {
  Box,
  Container,
  Divider,
  Stack,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import CategoryTitle from '../widgets/CategoryTitle';
import { BiMoney } from 'react-icons/bi';
import { CategoryPost } from '@/components/widgets';
import { IoIosPeople } from 'react-icons/io';
import { GiHealthPotion } from 'react-icons/gi';
import { useQuery } from '@apollo/client';
import { ALL_CATEGORIES } from '@/services/GraphSchema';
import { formatUnixDate } from '../../helpers/utils';
import dayjs from 'dayjs';

const ThreeColumnSection = ({
  lifeData,
  lifeLoading,
  financeData,
  financeLoading,
  healthLoading,
  healthData,
}) => {
  const { colorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const { data: catsData } = useQuery(ALL_CATEGORIES);

  return (
    <Container maxW="1170px" as={`section`}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
        <Box position={`relative`} flex={1}>
          <Box mb={8}>
            <CategoryTitle
              title={`Tài chính`}
              icon={
                <BiMoney
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
            {!financeLoading && (
              <CategoryPost
                posts={financeData.getPosts.map((post) => {
                  const category = catsData.categories.find((cat) => {
                    const matches = cat.tags.filter(
                      (tag) => tag.id === post.content_tags[0]
                    );
                    return matches.length > 0;
                  });
                  return {
                    ...post,
                    imageUrl: post.images[0].src ?? post.extra_info.image,
                    category: category ? category.name : 'Khác',
                    publishDate:
                      post.extra_info.date_published !== null
                        ? formatUnixDate(post.extra_info.date_published / 1000)
                        : dayjs(new Date(post.createdAt)).format('DD/MM/YYYY'),
                  };
                })}
                limit={5}
                loading={false}
              />
            )}
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
            {!lifeLoading && (
              <CategoryPost
                posts={lifeData.getPosts.map((post) => {
                  const category = catsData.categories.find((cat) => {
                    const matches = cat.tags.filter(
                      (tag) => tag.id === post.content_tags[0]
                    );
                    return matches.length > 0;
                  });
                  return {
                    ...post,
                    imageUrl: post.images[0].src ?? post.extra_info.image,
                    category: category ? category.name : 'Khác',
                    publishDate:
                      post.extra_info.date_published !== null
                        ? formatUnixDate(post.extra_info.date_published / 1000)
                        : dayjs(new Date(post.createdAt)).format('DD/MM/YYYY'),
                  };
                })}
                limit={5}
                loading={false}
              />
            )}
          </Box>
          {!isLargerThan768 && <Divider mt={8} />}
        </Box>

        <Box position={`relative`} flex={1}>
          <Box mb={8}>
            <CategoryTitle
              title={`Sức khỏe`}
              icon={
                <GiHealthPotion
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
            {!healthLoading && (
              <CategoryPost
                posts={healthData.getPosts.map((post) => {
                  const category = catsData.categories.find((cat) => {
                    const matches = cat.tags.filter(
                      (tag) => tag.id === post.content_tags[0]
                    );
                    return matches.length > 0;
                  });
                  console.log(post.extra_info.date_published);
                  return {
                    ...post,
                    imageUrl: post.images[0].src ?? post.extra_info.image,
                    category: category ? category.name : 'Khác',
                    publishDate:
                      post.extra_info.date_published !== null
                        ? formatUnixDate(post.extra_info.date_published / 1000)
                        : dayjs(new Date(post.createdAt)).format('DD/MM/YYYY'),
                  };
                })}
                limit={5}
                loading={false}
              />
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ThreeColumnSection;
