import type { ScriptType, LinkType } from '../types'; // eslint-disable-line

export const loadScript = async (scriptDeclare: ScriptType) => {
  const promise: Promise<void> = new Promise(resolve => {
    let script: HTMLScriptElement = null
    if (scriptDeclare instanceof HTMLScriptElement) {
      script = scriptDeclare
    } else {
      script = document.createElement('script')
      const scriptAttrs: ScriptType = typeof scriptDeclare !== 'string'
        ? scriptDeclare
        : {
          type: 'text/javascript',
          src: scriptDeclare
        }
      Object.entries(scriptAttrs).forEach(([attr, value]) => {
        script[attr] = value
      })
    }
    if (script.src) {
      script.onload = script.onerror = () => {
        resolve()
      }
    }
    document.body.appendChild(script)
    if (!script.src) {
      resolve()
    }
  })
  return promise
}

export const loadLink = (linkDeclare: LinkType) => {
  let link: HTMLLinkElement = null
  if (linkDeclare instanceof HTMLLinkElement) {
    link = linkDeclare
  } else {
    const linkAttrs: LinkType = typeof linkDeclare !== 'string'
      ? linkDeclare
      : {
        rel: 'stylesheet',
        type: 'text/css',
        href: linkDeclare
      }
    link = document.createElement('link')
    Object.entries(linkAttrs).forEach(([attr, value]) => {
      link[attr] = value
    })
  }
  document.head.appendChild(link)
}

export default {
  loadScript,
  loadLink
}
