import { Container, Divider } from '@chakra-ui/react';
import VisuallyHidden from '@reach/visually-hidden';
import { GridPost } from '@/components/widgets';
import {useQuery} from "@apollo/client";
import {ALL_CATEGORIES, GET_LASTED_POST} from "@/services/GraphSchema";
import {formatUnixDate} from "../../helpers/utils";

const FeaturedSection = () => {
  const { data:catsData } = useQuery(ALL_CATEGORIES);
  const { loading, error, data } = useQuery(GET_LASTED_POST, {
    variables: {
      sort: "createAt:DESC",
      limit: 3
    }
  });


  if(loading) return <div>Loading...</div>
  return (
    <Container maxW="1170px" as={`section`} mb={8} id={`featured-post`}>
      <VisuallyHidden>
        <h2>Bài viết nổi bật</h2>
      </VisuallyHidden>
      <GridPost
        loading={false}
        posts={data.getLastedPost.map(post => {
          const category = catsData.categories.find(cat => {
            const matches = cat.tags.filter(tag => tag.id === post.content_tags[0])
            return matches.length > 0;
          });
          return {
            ...post,
            imageUrl: post.images[0]?.src ?? post.extra_info.image,
            category: category ? category.name : 'Khác',
            publishDate: formatUnixDate(post.extra_info.date_published / 1000),
          }
        })}
      />
      <Divider mt={8} />
    </Container>
  );
};

export default FeaturedSection;
