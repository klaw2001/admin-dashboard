import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Records',
    path: '/records',
    icon: icon('ic_record'),
  },
  {
    title: 'chats',
    path: '/chats',
    icon: icon('ic_chat'),
  },
  {
    title: 'transaction list',
    path: '/transaction-lists',
    icon: icon('ic_event'),
  },
  {
    title: 'Events',
    path: '/events-calender',
    icon: icon('ic_calendar'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  
];

export default navConfig;
