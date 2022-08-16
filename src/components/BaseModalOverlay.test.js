import { render } from '@testing-library/vue';
import BaseModalOverlay from './BaseModalOverlay';

it('renders with snapshot', () => {
    const { html } = render(BaseModalOverlay);
    const comment = 'A very very long comment';
    const videoObj = {
        id: Math.ceil(Math.random() * 100),
        title: 'Video title',
        publishedAt: new Date(),

    }
    expect(html()).toMatchInlineSnapshot(`"<div class=\\"fixed inset-0 bg-black bg-opacity-80\\" data-testid=\\"base-modal-overlay\\"></div>"`);
    expect(videoObj).toMatchInlineSnapshot({
  id: expect.any(Number),
  publishedAt: expect.any(Date) }, `
Object {
  "id": Any<Number>,
  "publishedAt": Any<Date>,
  "title": "Video title",
}
`);
    expect(comment).toMatchInlineSnapshot(`"A very very long comment"`);
});