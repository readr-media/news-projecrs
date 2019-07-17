import { MM_DOMAIN, OLD_PROJECTS_SLUGS, READR_DOMAIN, READR_DOMAIN_PROD, READR_SITE_URL } from '../constants'
import { getRole } from 'src/util/ABRoleAssign'
import Cookie from 'vue-cookie'
import uuidv4 from 'uuid/v4'

export function currEnv () {
  if (process.env.VUE_ENV === 'client') {
    if (location.host.indexOf(MM_DOMAIN) === 0 || location.host.indexOf(`projects.${MM_DOMAIN}`) === 0 || location.host.indexOf(READR_DOMAIN_PROD) === 0) {
      return 'prod'
    } else {
      return 'dev'
    }
  }
}
export function setMmCookie () {
  const uuid = uuidv4()
  Cookie.set('mmid', uuid, { expires: (10 * 365 * 24) + 'h' })
  return uuid
}

export function getFBCommentsUrl () {
  if (process.env.VUE_ENV === 'client') {
    const path = location.pathname.slice(1)
    const projectName = location.pathname.replace('/project/', '')
    if (location.hostname.indexOf(READR_DOMAIN_PROD) !== -1) {
      return `${READR_SITE_URL}${projectName}`
    }
    return `http://dev.${READR_DOMAIN}/${path}`
  }
  return ''
}

export function getHost () {
  const browser = typeof window !== 'undefined'
  if (browser) {
    return `//${location.host}`
  } else {
    const host = process.env.HOST || 'localhost'
    const port = parseInt(process.env.PORT) || 8080
    return `${host}:${port}`
  }
}

export function getProtocol () {
  const browser = typeof window !== 'undefined'
  if (browser) {
    return location.protocol
  }
  return 'http:'
}

export function getMmid ({ assisgnedRole, distribution }) {
  const mmid = Cookie.get('mmid')
  if (assisgnedRole) {
    return assisgnedRole.toUpperCase()
  } else {
    const role = getRole({ mmid, distribution })
    return role
  }
}

export function getReportUrl (slug) {
  return OLD_PROJECTS_SLUGS.includes(slug) ? `https://${MM_DOMAIN}/projects/${slug}` : `https://${READR_DOMAIN_PROD}/project/${slug}`
}

export function isScrollBarReachBottom (ratio = 0, errorMargin = 10) {
  const vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  function getScrollXY () {
    var scrOfX = 0, scrOfY = 0
    if ( typeof ( window.pageYOffset ) == 'number' ) {
      // Netscape compliant
      scrOfY = window.pageYOffset
      scrOfX = window.pageXOffset
    } else if ( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
      // DOM compliant
      scrOfY = document.body.scrollTop
      scrOfX = document.body.scrollLeft
    } else if ( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
      // IE6 standards compliant mode
      scrOfY = document.documentElement.scrollTop
      scrOfX = document.documentElement.scrollLeft
    }
    return [ scrOfX, scrOfY, ]
  }

  function getDocHeight () {
    var D = document
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    )
  }
  
  return getDocHeight() <= getScrollXY()[1] + window.innerHeight + (vh * ratio) + errorMargin
}
