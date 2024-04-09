import { siteSettings } from '@/settings/setting';
import React from 'react'

export default function Dashboard({auth}) {

    const LinkRedirect = siteSettings.sidebarLinks;
  
    auth.user.role === 1 && ( window.location.href = LinkRedirect.admin.redirect.href )
    auth.user.role === 0 && ( window.location.href = LinkRedirect.client.redirect.href )
    

    return(
        <div></div>
    )
}
