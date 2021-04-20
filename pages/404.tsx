import { Image, Stack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineHome } from 'react-icons/ai';

const Custom404 = () => {
  const router = useRouter();
  const redirectHome = () => {
    router.push('/');
  };
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      py={4}
    >
      <Image src="/not-found-404.png" mW={500} mb={2} />
      <Button
        leftIcon={<AiOutlineHome />}
        onClick={redirectHome}
        colorScheme="brand"
      >
        Quay về trang chủ
      </Button>
    </Stack>
  );
};

export default Custom404;
