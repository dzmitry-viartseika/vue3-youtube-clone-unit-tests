import { render } from '@testing-library/vue';
import BaseModalOverlay from './BaseModalOverlay';

it.only('renders with snapshot', () => {
    const { html } = render(BaseModalOverlay);
    const comment = 'A very very long comment';
    const videoObj = {
        id: Math.ceil(Math.random() * 100),
        title: 'Video title',
        publishedAt: new Date(),

    }
    expect(html()).toMatchSnapshot();
    expect(videoObj).toMatchSnapshot({
        id: expect.any(Number),
        publishedAt: expect.any(Date)
    });
    expect(comment).toMatchSnapshot();
});