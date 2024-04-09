export const siteSettings = {
    name: "IP-Tv Services",
    description: "",

    sidebarLinks: {
        admin: {
            home: {
                href: 'dashboard',
                label: 'Home',
            },
            // credits_log : {
            //     href: 'admin.list-creditslog',
            //     label: 'List Credits log',
            // },
            // credits_request : {
            //     href: 'admin.request-credits',
            //     label: 'Request Credits',
            // },
            // account_setting : {
            //     href: 'admin.settings',
            //     label: 'Account Settings',
            // },
            redirect:{
                href: '/admin/dashboard',
            },
            base_url: '/admin'
        },
        
    },
    base_url_asset : 'http://localhost:8000/'
};