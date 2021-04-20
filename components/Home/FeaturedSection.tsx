import { Container, Divider } from '@chakra-ui/react';
import VisuallyHidden from '@reach/visually-hidden';
import { GridPost } from '@/components/widgets';
import { formatUnixDate } from '../../helpers/utils';
import dayjs from 'dayjs';

const FeaturedSection = ({ loading, data }) => {
  if (loading) return <div>Loading...</div>;
  return (
    <Container maxW="1170px" as={`section`} mb={8} id={`featured-post`}>
      <VisuallyHidden>
        <h2>Bài viết nổi bật</h2>
      </VisuallyHidden>
      <GridPost
        loading={false}
        posts={data.map((post) => {
          return {
            ...post,
            imageUrl: post.images[0]?.src ?? post.extra_info.image,
            category: post.extra_info.category
              ? post.extra_info.category.name
              : 'Khác',
            publishDate:
              post.extra_info.date_published !== null
                ? formatUnixDate(post.extra_info.date_published / 1000)
                : dayjs(new Date(post.createdAt)).format('DD/MM/YYYY'),
          };
        })}
      />
      <Divider mt={8} />
    </Container>
  );
};

export default FeaturedSection;
