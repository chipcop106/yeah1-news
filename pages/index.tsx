import Layout from '@/components/layout';
import { initializeApollo } from '../lib/apolloClient';
import { ALL_CATEGORIES, GET_POSTS } from '../services/GraphSchema';
import { useQuery } from '@apollo/client';
import FeaturedSection from '@/components/Home/FeaturedSection';
// import SocialSection from '@/components/Home/SocialSection';
// import TeenSection from '@/components/Home/TeenSection';
import LastedPostSection from '@/components/Home/LastedPostSection';
// import SportSection from '@/components/Home/SportSection';
// import ThreeColumnSection from '@/components/Home/ThreeColumnSection';
import { mergePostQuery } from '@/helpers/utils';
import dynamic from 'next/dynamic';
import { Spinner } from '@chakra-ui/react';

const SocialSection = dynamic(() => import('@/components/Home/SocialSection'));
const TeenSection = dynamic(() => import('@/components/Home/TeenSection'));
const SportSection = dynamic(() => import('@/components/Home/SportSection'));
const ThreeColumnSection = dynamic(
  () => import('@/components/Home/ThreeColumnSection')
);

//Category id
const LIFE_ID = '60629fe6f6a2c23fb4daec62';
const FINANCE_ID = '606eac048a31bc3a8812d4a7';
const HEALTH_ID = '606ea3808a31bc3a8812d4a6';
const SPORT_ID = '604f19f65ded4212e8bf2b23';
const TEEN_ID = '60629fd2f6a2c23fb4daec60';
const SOCIAL_ID = '60629fc0f6a2c23fb4daec5f';

const Home = () => {
  const {
    loading: lastedLoading,
    data: lastedData,
    fetchMore: lastedFetchMore,
  } = useQuery(GET_POSTS, {
    variables: {
      sort: 'createAt:DESC',
      limit: 8,
      start: 0,
      command: 'lasted',
    },
    notifyOnNetworkStatusChange: true,
  });

  const { loading: videoLoading, data: videoData } = useQuery(GET_POSTS, {
    variables: {
      where: {
        type: 'video',
      },
      sort: 'createAt:DESC',
      limit: 6,
      start: 0,
    },
  });

  const { loading: teenLoading, data: teenData } = useQuery(GET_POSTS, {
    variables: {
      where: {
        categoryId: TEEN_ID,
      },
      sort: 'createAt:DESC',
      limit: 24,
    },
  });

  const { loading: socialLoading, data: socialData } = useQuery(GET_POSTS, {
    variables: {
      where: {
        categoryId: SOCIAL_ID,
      },
      sort: 'createAt:DESC',
      limit: 10,
      start: 0,
    },
  });
  const { loading: sportLoading, data: sportData } = useQuery(GET_POSTS, {
    variables: {
      where: {
        categoryId: SPORT_ID,
      },
      sort: 'createAt:DESC',
      limit: 10,
      start: 0,
    },
  });
  const { loading: sportVideoLoading, data: sportVideoData } = useQuery(
    GET_POSTS,
    {
      variables: {
        where: {
          categoryId: SPORT_ID,
          type: 'video',
        },
        limit: 5,
        start: 0,
      },
    }
  );

  const { loading: lifeLoading, error: lifeError, data: lifeData } = useQuery(
    GET_POSTS,
    {
      variables: {
        where: {
          categoryId: LIFE_ID,
        },
        limit: 5,
      },
    }
  );
  const {
    loading: financeLoading,
    error: financeError,
    data: financeData,
  } = useQuery(GET_POSTS, {
    variables: {
      where: {
        categoryId: FINANCE_ID,
      },
      limit: 5,
    },
  });
  console.log({ financeData });
  const {
    loading: healthLoading,
    error: healthError,
    data: healthData,
  } = useQuery(GET_POSTS, {
    variables: {
      where: {
        categoryId: HEALTH_ID,
      },
      limit: 5,
    },
  });

  return (
    <>
      <FeaturedSection
        loading={lastedLoading}
        data={lastedData?.getPosts.slice(0, 3) ?? []}
      />
      <LastedPostSection
        onLoadMore={() =>
          lastedFetchMore({
            variables: {
              sort: 'createAt:DESC',
              limit: 8,
              start: 0 + lastedData.getPosts.length,
            },
            // updateQuery: mergePostQuery,
          })
        }
        lastedLoading={lastedLoading}
        videoLoading={videoLoading}
        lastedPosts={lastedData?.getPosts.slice(3) ?? []}
        lastedVideos={videoData?.getPosts ?? []}
      />
      <TeenSection loading={teenLoading} data={teenData?.getPosts ?? []} />
      <SocialSection
        loading={socialLoading}
        data={socialData?.getPosts ?? []}
      />
      <SportSection
        loading={sportLoading}
        data={sportData?.getPosts ?? []}
        loadingVideo={sportVideoLoading}
        dataVideo={sportVideoData?.getPosts ?? []}
      />
      <ThreeColumnSection
        healthData={healthData}
        healthLoading={healthLoading}
        financeData={financeData}
        financeLoading={financeLoading}
        lifeData={lifeData}
        lifeLoading={lifeLoading}
      />
    </>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_CATEGORIES,
  });
  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      sort: 'createAt:DESC',
      limit: 8,
      start: 0,
      command: 'lasted',
    },
  });
  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        type: 'video',
      },
      sort: 'createAt:DESC',
      limit: 6,
      start: 0,
    },
  });
  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      sort: 'createAt:DESC',
      limit: 5,
      start: 4,
    },
  });

  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        categoryId: TEEN_ID,
      },
      sort: 'createAt:DESC',
      limit: 24,
    },
  });

  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        categoryId: SOCIAL_ID,
      },
      sort: 'createAt:DESC',
      limit: 10,
      start: 0,
    },
  });

  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        categoryId: SPORT_ID,
      },
      sort: 'createAt:DESC',
      limit: 10,
      start: 0,
    },
  });
  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        categoryId: SPORT_ID,
        type: 'video',
      },
      limit: 5,
      start: 0,
    },
  });
  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        categoryId: LIFE_ID,
      },
      limit: 5,
    },
  });
  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        categoryId: FINANCE_ID,
      },
      limit: 5,
    },
  });
  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      where: {
        categoryId: HEALTH_ID,
      },
      limit: 5,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 60,
  };
}
//
Home.layout = Layout;

export default Home;
