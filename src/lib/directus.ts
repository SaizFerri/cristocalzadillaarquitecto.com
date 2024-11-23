import {
  Query,
  QueryFilter,
  createDirectus,
  readItems,
  rest,
} from '@directus/sdk';

import { Locales } from '@/const';

export const enum Collection {
  PROJECTS = 'projects',
  NEWS = 'news',
}

export const enum Status {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export const COLLECTION_STATUS = [
  Status.PUBLISHED,
  process.env.NODE_ENV !== 'production' ? Status.DRAFT : undefined,
] as Status[];

interface Collections {
  projects: ProjectResponse[];
  news: NewsResponse[];
}

export interface DirectusFile {
  id: string;
  filename_download: string;
  width?: number;
  height?: number;
  type: string;
  title: string;
}
export interface DirectusImage extends DirectusFile {
  width: number;
  height: number;
}

type DirectusAPIParams<T = unknown> = {
  limit: number;
  filter?: QueryFilter<Collections, T>;
};

interface BaseCollection {
  sort: number | null;
  status: Status;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
}

export type Translation = {
  id: number;
  languages_code: Locales;
  [key: string]: any;
};

export type ProjectTranslation = Translation & {
  projects_id: number;
};

export type NewsTranslation = Translation & {
  news_id: number;
};

interface Project extends BaseCollection {
  id: number;
  type: 'urbanism' | 'structures';
  title: string;
  slug: string;
  location?: string;
  content_title?: string;
  content_text_left?: string;
  content_text_right?: string;
  header_image?: DirectusImage;
  gallery?: DirectusImage[];
  translations: Pick<
    Project,
    'id' | 'content_title' | 'content_text_left' | 'content_text_right'
  > &
    ProjectTranslation[];
}

type ProjectResponse = Omit<Project, 'gallery'> & {
  gallery?: {
    id: number;
    project: number;
    file: DirectusImage;
    sort: number;
  }[];
};

type NewsResponse = Omit<News, 'gallery'> & {
  gallery?: {
    id: number;
    news: number;
    file: DirectusImage;
    sort: number;
  }[];
};

interface News extends BaseCollection {
  id: number;
  title: string;
  teaser: string;
  slug: string;
  header_image?: DirectusImage;
  content: string;
  gallery?: DirectusImage[];
  translations: Pick<News, 'id' | 'title' | 'teaser' | 'content'> &
    NewsTranslation[];
}

export const directus = createDirectus<Collections>(
  process.env.NEXT_PUBLIC_DIRECTUS_URL as string,
).with(rest());

export async function getProjects(
  { limit }: DirectusAPIParams = { limit: -1 },
): Promise<Project[]> {
  const projects = await directus.request(
    readItems(Collection.PROJECTS, {
      limit,
      fields: ['*.*', 'header_image.*', 'translations.*', 'gallery.file.*'],
      sort: 'sort',
      filter: {
        status: {
          _in: COLLECTION_STATUS,
        },
      },
    } as Query<Collections, ProjectResponse>),
  );

  if (!projects || projects.length === 0) {
    return [];
  }

  return projects.map((project) => ({
    ...project,
    gallery: (project.gallery ?? []).map(({ file }) => file),
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await directus.request(
    readItems(Collection.PROJECTS, {
      limit: 1,
      fields: ['*.*', 'header_image.*', 'translations.*', 'gallery.file.*'],
      filter: {
        slug: {
          _eq: slug,
        },
        status: {
          _in: COLLECTION_STATUS,
        },
      },
    } as Query<Collections, ProjectResponse>),
  );

  if (!projects || projects.length === 0) {
    return null;
  }

  const project = projects[0];

  return {
    ...project,
    gallery: (project.gallery ?? []).map(({ file }) => file),
  };
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const proyects = await directus.request(
    readItems(Collection.PROJECTS, {
      limit: -1,
      fields: ['slug'],
      filter: {
        status: {
          _in: COLLECTION_STATUS,
        },
      },
    }),
  );

  return proyects.map(({ slug }) => slug);
}

export async function getNews(
  { limit }: DirectusAPIParams = { limit: -1 },
): Promise<News[]> {
  const news = await directus.request(
    readItems(Collection.NEWS, {
      limit,
      fields: ['*.*', 'header_image.*', 'translations.*', 'gallery.file.*'],
      sort: 'date_created',
      filter: {
        status: {
          _in: COLLECTION_STATUS,
        },
      },
    } as Query<Collections, NewsResponse>),
  );

  if (!news || news.length === 0) {
    return [];
  }

  return news.map((newsItem) => ({
    ...newsItem,
    gallery: (newsItem.gallery ?? []).map(({ file }) => file),
  }));
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  const news = await directus.request(
    readItems(Collection.NEWS, {
      limit: 1,
      fields: ['*.*', 'header_image.*', 'translations.*', 'gallery.file.*'],
      filter: {
        slug: {
          _eq: slug,
        },
        status: {
          _in: COLLECTION_STATUS,
        },
      },
    } as Query<Collections, NewsResponse>),
  );

  if (!news || news.length === 0) {
    return null;
  }

  const newsItem = news[0];

  return {
    ...newsItem,
    gallery: (newsItem.gallery ?? []).map(({ file }) => file),
  };
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const news = await directus.request(
    readItems(Collection.NEWS, {
      limit: -1,
      fields: ['slug'],
      filter: {
        status: {
          _in: COLLECTION_STATUS,
        },
      },
    }),
  );

  return news.map(({ slug }) => slug);
}

interface NextImageLoader {
  src: string;
  width: number;
  quality?: number;
}

export function generateImageLoader(key: string) {
  return ({ src }: NextImageLoader) => {
    return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${src}?key=${key}`;
  };
}

export function getFileSrc(id: string, fileName?: string) {
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${id}${
    fileName ? `/${fileName}` : ''
  }`;
}
