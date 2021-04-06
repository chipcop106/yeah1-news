import { Container, useColorMode } from '@chakra-ui/react';
import CategoryTitle from '../widgets/CategoryTitle';
import { IoAccessibilityOutline } from 'react-icons/io5';
import { SliderPost } from '@/components/widgets';
import {useQuery} from "@apollo/client";
import {GET_CONTENT_CATEGORY} from "@/services/GraphSchema";
import {formatUnixDate} from "../../helpers/utils";

const TeenSection = () => {
  const { colorMode } = useColorMode();
  const { loading, error, data } = useQuery(GET_CONTENT_CATEGORY, {
    variables: {
      where: {
        categoryId: '60629fd2f6a2c23fb4daec60'
      },
      sort: "createAt:DESC",
      limit: 24
    }
  });

  if(loading) return <div>Loading...</div>

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
        {
          data.getLastedPost.length > 0 && <SliderPost posts={data.getLastedPost.map(post => ({
            ...post,
            imageUrl: post.images[0]?.src ?? post.extra_info.image,
            category: 'Giới trẻ',
            publishDate: formatUnixDate(post.extra_info.date_published / 1000),

          }))} loading={false} />
        }
      </Container>
    </Container>
  );
};

export default TeenSection;
