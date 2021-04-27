import { Container, useColorMode } from '@chakra-ui/react';
import CategoryTitle from '../widgets/CategoryTitle';
import { IoAccessibilityOutline } from 'react-icons/io5';
import { SliderPost } from '@/components/widgets';
import { formatUnixDate } from '../../helpers/utils';
import dayjs from 'dayjs';

const TeenSection = ({ loading, data }) => {
  const { colorMode } = useColorMode();

  if (loading) return <div>Loading...</div>;

  return (
    <Container
      maxW={`100%`}
      as={`section`}
      mb={8}
      bg={colorMode === 'light' ? `gray.50` : `gray.800`}
      py={8}
      px={0}
    >
      <Container maxW={`1170px`}>
        <CategoryTitle
          title={`Giới trẻ`}
          icon={
            <IoAccessibilityOutline
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
        {data.length > 0 && (
          <SliderPost
            posts={data.map((post) => ({
              ...post,
              imageUrl: post.images[0]?.src ?? post.extra_info.image,
              category: post.extra_info.category?.name ?? 'Khác',
              publishDate:
                post.extra_info.date_published !== null
                  ? formatUnixDate(post.extra_info.date_published / 1000)
                  : dayjs(new Date(post.createdAt)).format('DD/MM/YYYY'),
            }))}
            loading={false}
          />
        )}
      </Container>
    </Container>
  );
};

export default TeenSection;
