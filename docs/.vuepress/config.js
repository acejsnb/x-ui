module.exports = {
    title: 'persagy-ui',
    description: '博锐尚格ui组件使用文档',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    dest: './docs/dist',
    ga: '',
    evergreen: true,
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '组件', link: '/guide/' },
            { text: '博锐尚格', link: 'http://www.persagy.com' },
        ],
        sidebarDepth: 2,
        sidebar: [
            {
                title: 'Guide',
                children: [
                    ['/guide/button/', 'Button']
                ]
            }
        ]
    }
};
