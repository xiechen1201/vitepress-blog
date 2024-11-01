export default [
  {
    text: 'Linux 操作',
    collapsed: false,
    items: [
      { text: 'One', link: '/guide/one' },
      { text: 'Two', link: '/guide/two' }
    ]
  },
  {
    text: '网络协议',
    collapsed: true,
    items: [
      { text: 'One', link: '/guide/one' },
      { text: 'Two', link: '/guide/two' }
    ]
  },
  {
    text: '浏览器',
    collapsed: true,
    items: [
      { text: 'One', link: '/guide/one' },
      { text: 'Two', link: '/guide/two' },
      {
        text: '深入',
        items: [
          { text: 'One', link: '/guide/one' },
          { text: 'Two', link: '/guide/two' }
        ]
      }
    ]
  }
];
