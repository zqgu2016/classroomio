import { getSupabase, supabase } from '$lib/utils/functions/supabase';
import { fetchCourse } from '$lib/utils/services/courses';
import type { MetaTagsProps } from 'svelte-meta-tags';

if (!supabase) {
  getSupabase();
}

export const load = async ({ params = { slug: '' } }) => {
  const { data } = await fetchCourse(undefined, params.slug);

  const pageMetaTags = Object.freeze({
    title: data?.title,
    description: data?.description,
    openGraph: {
      title: data?.title,
      description: data?.description,
      images: [
        {
          url: data?.logo || '',
          alt: data?.title,
          width: 280,
          height: 200,
          secureUrl: data?.logo,
          type: 'image/jpeg'
        }
      ]
    },
    twitter: {
      handle: '@academy.rios.com.ai',
      site: '@academy.rios.com.ai',
      cardType: 'summary_large_image' as const,
      title: data?.title,
      description: data?.description,
      image: data?.logo,
      imageAlt: 'RiOS Academy OG Image'
    }
  }) satisfies MetaTagsProps;

  return {
    slug: params.slug,
    course: data,
    pageMetaTags
  };
};
