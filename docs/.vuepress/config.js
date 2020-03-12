module.exports = {
    // base: './',
    title: 'persagy-ui',
    description: '博锐尚格ui组件使用文档',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    port: 9000,
    dest: './docs/dist',
    evergreen: true,
    themeConfig: {
        logo: '/logo_persagy.png',
        smoothScroll: true,
        nav: [
            { text: '首页', link: '/' },
            { text: '组件', link: '/guide/' },
            { text: '博锐尚格', link: 'http://www.persagy.com' },
        ],
        //sidebarDepth: 2,
        sidebar: [
            ['/', '首页'],
            '/guide/',
            '/guide/log/',
            {
                title: '组件',
                collapsable: false,
                children: [
                    '/guide/button/',
                    '/guide/dropDownButton/',
                    '/guide/badge/',
                    '/guide/breadcrumb/',
                    '/guide/divider/',
                    '/guide/drawer/',
                    '/guide/dropdown/',
                    '/guide/dropGroup/',
                    '/guide/headers/',
                    '/guide/message/',
                    '/guide/loading/',
                    '/guide/modal/',
                    '/guide/select/',
                    '/guide/selectSearch/',
                    '/guide/stick/',
                    '/guide/tabs/',
                    '/guide/toggle/',
                    '/guide/tree/',
                    '/guide/treeBi/',
                    '/guide/tag/',
                    '/guide/transfer/',
                    '/guide/transferSelect/',
                    '/guide/transferSelectModal/',
                    '/guide/pickerDate/',
                    '/guide/pickerDay/',
                    '/guide/pickerMonth/',
                    '/guide/pickerTime/',
                    '/guide/pickerWeek/',
                    '/guide/pickerYear/',
                    '/guide/avatar/',
                    '/guide/imageUpload/',
                    '/guide/fileUpload/',
                    '/guide/tooltip/',
                    '/guide/antdTooltip/',
                    '/guide/loading/',
                    '/guide/popover/',
                    '/guide/icon/',
                    '/guide/table/',
                    '/guide/pagination/',
                ]
            },
        ]
    }
};
