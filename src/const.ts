export type Locales = 'es' | 'en';
export const locales = ['es', 'en'] as const;
export const isProduction = process.env.NODE_ENV === 'production';
