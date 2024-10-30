import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'หน้าแรก',
      href: getPermalink('/'),
    },
    {
      text: 'สินค้า/บริการ',
      href: '/services',
    },
    {
      text: 'ผลงานของเรา',
      href: '/our-works',
    },
    {
      text: 'มาตรฐาน และใบรับรองของเรา',
      href: '/our-standard',
    },
    {
      text: 'ทีมงาน',
      href: '/our-team',
    },
    {
      text: 'แหล่งเรียนรู้',
      links: [
        {
          text: 'Medium TTSS',
          href: 'https://medium.com/t-t-software-solution'
        }
      ]
    },
    {
      text: 'ข่าวสารและกิจกรรม',
      href: '#',
    },
    {
      text: 'ร่วมงานกับเรา',
      href: '/career',
    },
  ],
  actions: [{
    text: 'ติดต่อเรา',
    href: '/contact-us',
  }],
};

export const footerData = {
  links: [
    {
      title: 'เมนู',
      links: [
        { text: 'หน้าแรก', href: getPermalink('/') },
        { text: 'สินค้า/บริการ', href: '/services' },
        { text: 'ผลงานของเรา', href: '/our-works' },
        { text: 'มาตรฐาน และใบรับรองของเรา', href: '/our-standard' }, 
      ],
    },
    {
      title: ' ',
      links: [
        { text: 'ทีมงาน', href: '/our-team' },
        { text: 'แหล่งเรียนรู้', href: 'https://portal.tt-ss.net/' },
        { text: 'ร่วมงานกับเรา', href: '/career' },
        { text: 'ติดต่อเรา', href: '/contact-us' },
      ],
    },
  ],
  contactLinks: [
    { icon: 'envelope', text: 'nakorn@tt-ss.net', href: 'mailto:nakorn@tt-ss.net' },
    { icon: 'envelope', text: 'hr@tt-ss.net (ฝ่ายทรัพยากรบุคคล)', href: 'mailto:hr@tt-ss.net' },
    { icon: 'phone', text: '086-899-6243 (สำนักงานกรุงเทพ)', href: 'tel:0868996243' },
    { icon: 'phone', text: '061-018-1275 (สำนักงานขอนแก่น)', href: 'tel:0610181275' },
    { icon: 'line', text: '@ttss', href: 'https://line.me/R/ti/p/@ttss' },
  ],
  socialLinks: [
    { ariaLabel: "Medium", icon: 'tabler:brand-medium', href: 'https://medium.com/t-t-software-solution' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/ttsoftwaresolution' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/@ttsoftwaresolution' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/t-t-software-solution' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/T-T-Software-Solution' },
  ],
};
