import rss from '@astrojs/rss';
import { getPosts } from '../lib/content';

export function GET(context) {
  const posts = getPosts().slice(0, 100);
  return rss({
    title: 'A Blue Star',
    description: 'Steven Smethurst is a Vancouver based Maker, Hacker, Coder, Artist, and all around great guy!',
    site: context.site ?? 'https://blog.abluestar.com',
    items: posts.map((post) => ({
      title: post.title,
      description: post.description ?? post.excerpt ?? '',
      pubDate: post.date,
      link: post.permalink
    }))
  });
}
