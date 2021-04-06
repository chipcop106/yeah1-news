import { render } from '../../../helpers/test-utils';
import { queryByTestId, screen } from '@testing-library/react';
import { HorizontalCard } from '@/components/BlogCard';
import { CardProps } from '@/components/BlogCard/skin/HorizontalCard';
import { nanoid } from 'nanoid';

describe('HorizontalCard', () => {
  let expectedProps: CardProps;

  beforeEach(() => {
    expectedProps = {
      post: {
        id: nanoid(),
        title: 'Đây là title',
        description: 'Đây là mô tả',
        slug: 'day-la-title',
        publishDate: 'Thứ 5, 20/10/2020',
        category: 'Xã hội',
        imageUrl: 'https://via.placeholder.com/1280x768',
      },
    };
  });

  it('should render without throwing an error', () => {
    render(<HorizontalCard {...expectedProps} />);
    expect(
      screen.getByText(expectedProps.post.title, {
        selector: '.chakra-heading',
      })
    ).toBeInTheDocument();
  });

  it('should render title, image, description and meta', async () => {
    const { getByText, container } = render(
      <HorizontalCard {...expectedProps} />
    );
    const title = getByText(expectedProps.post.title);
    const description = getByText(expectedProps.post.description);
    const category = getByText(expectedProps.post.category);
    const imageEl = container.querySelector('.post-image');

    expect(title).toBeVisible();
    expect(description).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(imageEl).toHaveStyle(
      `background-image: url("${expectedProps.post.imageUrl}")`
    );
  });

  it("shouldn't render category and description", async () => {
    expectedProps = {
      ...expectedProps,
      showDescription: false,
      showCategory: false,
    };
    const { queryByTestId } = render(<HorizontalCard {...expectedProps} />);

    const description = queryByTestId('description');
    const category = queryByTestId('category');
    expect(description).not.toBeInTheDocument();
    expect(category).not.toBeInTheDocument();
  });
});
