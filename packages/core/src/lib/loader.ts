import { ScriptType, LinkType } from '../types'; // eslint-disable-line

export const loadScript = async (scriptDeclare: ScriptType) => {
  const promise: Promise<void> = new Promise(resolve => {
    const scriptAttrs: ScriptType = typeof scriptDeclare !== 'string'
      ? scriptDeclare
      : {
        type: 'text/javascript',
        src: scriptDeclare
      }
    const script = document.createElement('script')
    Object.entries(scriptAttrs).forEach(([attr, value]) => {
      script[attr] = value
    })
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
  const linkAttrs: LinkType = typeof linkDeclare !== 'string'
    ? linkDeclare
    : {
      rel: 'stylesheet',
      type: 'text/css',
      href: linkDeclare
    }
  const link = document.createElement('link')
  Object.entries(linkAttrs).forEach(([attr, value]) => {
    link[attr] = value
  })
  document.head.appendChild(link)
}

export const fetchScript = (fetch: typeof window.fetch) => async (src: string) => {
  try {
    const res = await fetch(src)
    const code = await res.text()
    return code
  } catch (err) {
    return ''
  }
}

export const excuteCode = (code: string) => {
  const fn = new Function(code); // eslint-disable-line
  fn()
}

export default {
  loadScript,
  loadLink,
  fetchScript,
  excuteCode
}
