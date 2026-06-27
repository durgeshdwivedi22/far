export const navigateToRoute = (path = '/') => {
  if (typeof window === 'undefined') return;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const hashPath = normalizedPath === '/' ? '#/' : `#${normalizedPath}`;

  window.location.hash = hashPath;
};
