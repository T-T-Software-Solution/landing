import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'รู้จักเรา',
      href: getPermalink('/about-us'),
    },
    {
      text: 'ผลิตภัณฑ์',
      href: '/products',
    },
    {
      text: 'บริการ',
      href: '/services',
    },
    {
      text: 'ผลงาน',
      href: '/our-works',
    },
    {
      text: 'มาตรฐานและใบรับรอง',
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
      href: '/news-and-events',
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

export const headerDataEN = {
  links: [
    {
      text: 'About Us',
      href: getPermalink('/en/about-us'),
    },
    {
      text: 'Products',
      href: '/en/products',
    },
    {
      text: 'Services',
      href: '/en/services',
    },
    {
      text: 'Our Works',
      href: '/en/our-works',
    },
    {
      text: 'Standards & Certifications',
      href: '/en/our-standard',
    },
    {
      text: 'Our Team',
      href: '/en/our-team',
    },
    {
      text: 'Resources',
      links: [
        {
          text: 'Medium TTSS',
          href: 'https://medium.com/t-t-software-solution'
        }
      ]
    },
    {
      text: 'News and Events',
      href: '/en/news-and-events',
    },
    {
      text: 'Career',
      href: '/en/career',
    },
  ],
  actions: [{
    text: 'Contact Us',
    href: '/en/contact-us',
  }],
};

export const footerData = {
  links: [
    {
      title: 'เมนู',
      links: [
        { text: 'รู้จักเรา', href: getPermalink('/about-us') },
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
    { icon: 'envelope', text: 'watcharapong@tt-ss.net', href: 'mailto:watcharapong@tt-ss.net' },
    { icon: 'envelope', text: 'hr@tt-ss.net (ฝ่ายทรัพยากรบุคคล)', href: 'mailto:hr@tt-ss.net' },
    { icon: 'phone', text: '090-161-9166 (สำนักงานกรุงเทพ)', href: 'tel:0901619166' },
    { icon: 'phone', text: '061-018-1275 (ฝ่ายทรัพยากรบุคคล)', href: 'tel:0610181275' },
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

export const footerDataEN = {
  links: [
    {
      title: 'Menu',
      links: [
        { text: 'Home', href: getPermalink('/en/about-us') },
        { text: 'Products/Services', href: '/en/services' },
        { text: 'Our Works', href: '/en/our-works' },
        { text: 'Standards & Certifications', href: '/en/our-standard' }, 
      ],
    },
    {
      title: ' ',
      links: [
        { text: 'Our Team', href: '/en/our-team' },
        { text: 'Resources', href: 'https://portal.tt-ss.net/' },
        { text: 'Career', href: '/en/career' },
        { text: 'Contact Us', href: '/en/contact-us' },
      ],
    },
  ],
  contactLinks: [
    { icon: 'envelope', text: 'watcharapong@tt-ss.net', href: 'mailto:watcharapong@tt-ss.net' },
    { icon: 'envelope', text: 'hr@tt-ss.net (HR Department)', href: 'mailto:hr@tt-ss.net' },
    { icon: 'phone', text: '(+66)90-161-9166 (Bangkok Office)', href: 'tel:+66901619166' },
    { icon: 'phone', text: '(+66)61-018-1275 (Khon Kaen Office)', href: 'tel:+66610181275' },
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
