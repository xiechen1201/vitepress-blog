export default [
    {
      text: 'Vue',
      collapsed: false,
      items: [
        { text: 'One1', link: '/guide/one' },
        { text: 'Two', link: '/guide/two' }
      ]
    },
    {
      text: 'React',
      collapsed: true,
      items: [
        { text: 'One', link: '/guide/one' },
        { text: 'Two', link: '/guide/two' }
      ]
    },
    {
      text: 'React Native',
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
  