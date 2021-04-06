import { Stack, IconButton, useColorMode } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { TransparentCard } from '@/components/BlogCard';
import Glide from '@glidejs/glide';
import styled from '@emotion/styled';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { useState } from 'react';
interface Post {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  hTag?: string;
  description: string;
  publishDate: string;
  isFeatured?: boolean;
  slug: string;
}

interface PostProps {
  posts?: Array<Post>;
  loading: boolean;
  sliderConfigs?: object;
}

const PostStyled = styled.div`
  width: 100%;
  height: 100%;
  .glide__slide {
    height: unset;
    article {
      height: 100%;
    }
  }
`;

const SliderPost: FC<PostProps> = ({
  posts = [],
  loading,
  sliderConfigs = {
    perView: 4,
    gap: 16,
    rewindDuration: 1000,
    animationDuration: 1000,
    animationTimingFunc: 'ease-out',
    bound: true,
    breakpoints: {
      480: {
        perView: 1,
      },
      768: {
        perView: 2,
      },
      992: {
        perView: 3,
      },
      1280: {
        perView: 4,
      },
    },
  },
}) => {
  const [disableButton, setDisableButton] = useState('prev');
  const { colorMode } = useColorMode();
  const slider = new Glide('.glide', sliderConfigs);

  const cleanSlider = () => {
    slider.on('run.before', null);
    slider.on('run.end', null);
    slider.on('run.start', null);
    slider.destroy();
  };

  useEffect(() => {
    slider.mount();
    slider.on('run.before', (evt) => {
      const scrollSteps = slider.settings.perView;
      if (evt.direction === '>') {
        evt.steps = -scrollSteps;
      } else if (evt.direction === '<') {
        evt.steps = scrollSteps;
      }
    });
    slider.on('run.before', (evt) => {
        setDisableButton('none');
    });
    slider.on('run.end', (evt) => {
         setDisableButton('next');
    });
    slider.on('run.start', (evt) => {
      setDisableButton('prev');
    });
    return cleanSlider;
  }, [posts]);

  return (
    <PostStyled>
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {posts.length > 0 &&
              posts.map((post) => (
                <li className="glide__slide" key={`${post.id}`}>
                  <TransparentCard
                    post={post}
                    headingProps={{
                      size: 'md',
                      color: 'white',
                    }}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <IconButton
            data-glide-dir="<"
            aria-label={`forward-previous`}
            icon={<IoChevronBackOutline />}
            variant={`solid`}
            isRound
            pos={`absolute`}
            top={`50%`}
            left={2}
            style={{ transform: `translateY(-50%)` }}
            colorScheme={colorMode === 'light' ? `whiteAlpha` : 'teal'}
            size={`lg`}
            disabled={disableButton === 'prev'}
          />

          <IconButton
            data-glide-dir=">"
            aria-label={`forward-previous`}
            icon={<IoChevronForwardOutline />}
            variant={`solid`}
            isRound
            pos={`absolute`}
            top={`50%`}
            right={2}
            style={{ transform: `translateY(-50%)` }}
            colorScheme={colorMode === 'light' ? `whiteAlpha` : 'secondBrand'}
            size={`lg`}
            disabled={disableButton === 'next'}
          ></IconButton>
        </div>
      </div>
    </PostStyled>
  );
};

export default SliderPost;
