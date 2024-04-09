export const siteSettings = {
    name: "IP-Tv Services",
    description: "",

    sidebarLinks: {
        admin: {
            home: {
                href: 'admin.dashboard',
                label: 'Dashbord',
            },
            ticket_list: {
                href: 'admin-ticket',
                label: 'Tickets',
            },
            create_panel: {
                href: 'admin.panel',
                label: 'Request Panel',
            },
            credits_request: {
                href: 'admin.request-credits',
                label: 'Request Credits',
            },
            payment_list: {
                href: 'admin.payment',
                label: 'List Payment',
            },
            service_list: {
                index_add: {
                    href: 'admin.add-services',
                    label: 'Create New Service'
                },
                index: {
                    href: 'admin.services',
                    label: 'List Services',
                    // path: '/admin/management/roles'
                },
            },
            client_list: {
                href: 'admin.client-list',
                label: 'Client List',
            },
            other_service: {
                href: 'admin.other-service',
                label: 'Request Other Service',
            },
            account_setting: {
                href: 'admin.settings',
                label: 'Account Settings',
            },
            redirect: {
                href: '/admin/dashboard',
            },
            base_url: '/admin'
        },
        client: {
            home: {
                href: 'client.dashboard',
                label: 'Dashbord',
            },
            ticket_list: {
                href: 'client-ticket',
                label: 'Tickets',
            },
            create_panel: {
                href: 'client.panel',
                label: 'Request Panel',
            },
            credits_request: {
                href: 'client.request-credits',
                label: 'Request Credits',
            },
            payment_list: {
                index_add: {
                    href: 'client.add-payment',
                    label: 'Add New Payment'
                },
                index: {
                    href: 'client.payment',
                    label: 'List Payment',
                    // path: '/admin/management/roles'
                },
            },
            service_list: {
                href: 'client.services',
                label: 'Service Promo',
                // path: '/admin/management/roles'             
            },
            other_service: {
                href: 'client.other-service',
                label: 'Request Other Service',
            },
            account_setting: {
                href: 'admin.settings',
                label: 'Account Settings',
            },
            redirect: {
                href: '/client/dashboard',
            },
            base_url: '/client'
        },
    },
    base_url_asset: 'http://localhost:8000/'
};