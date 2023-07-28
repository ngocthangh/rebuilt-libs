import { Options } from './options'
import { parseDataUrlContent } from './util'
import localforage from 'localforage'

export interface Metadata {
  blob: string
  contentType: string
}

const getUrlKey = (url: string) =>
  url.includes('imageUrl=') ? url.split('imageUrl=')[1] : url

const getLocalStorage = async (
  key: string,
  storeValue: Record<string, Metadata> = {},
  storePromise: Record<string, Promise<Metadata>> = {},
) => {
  try {
    const result = JSON.parse((await localforage.getItem(key)) || '{}')

    Object.keys(result).forEach((k) => {
      const urlKey = getUrlKey(k)
      storeValue[urlKey] = result[k]
      // storePromise[urlKey] = Promise.resolve(result[k])
    })
  } catch (error) {}
  return {}
}
let timeoutSetStore: null | ReturnType<typeof setTimeout> = null;
const setLocalStorage = (key: string, value: string) => {
  try {
    console.log('CALL SET DB', value)
    if (typeof key === 'string' && typeof value === 'string') {
      if (timeoutSetStore) {
        clearTimeout(timeoutSetStore)
      }
      timeoutSetStore = setTimeout(() => {
        console.log('REALLY SET DB', value)
        localforage.setItem(key, value)
      }, 200)
    }
  } catch (error) {}
}

const CACHING_KEY = 'mt-template-image-caching'
const storedCache: {
  [url: string]: Metadata
} = {}
//JSON.parse(localStorage.getItem(CACHING_KEY) || '{}') || {}

const cache: {
  [url: string]: Promise<Metadata>
} = {}
// Object.keys(storedCache).length
//   ? Object.entries(storedCache).reduce(
//       (result, cur) => ({
//         ...result,
//         [cur[0]]: Promise.resolve(cur[1]),
//       }),
//       {},
//     )
//   : {}
getLocalStorage(CACHING_KEY, storedCache, cache)

function getCacheKey(url: string) {
  let key = url //.replace(/\?.*/, '')

  key = getUrlKey(key)

  // font resourse
  if (/ttf|otf|eot|woff2?/i.test(key)) {
    key = key.replace(/.*\//, '')
  }

  return key
}

export function getBlobFromURL(
  url: string,
  options: Options,
): Promise<Metadata> {
  const cacheKey = getCacheKey(url)

  if (storedCache[cacheKey] != null) {
    console.log('GET FROM CACHE', cacheKey, storedCache)
    return Promise.resolve(storedCache[cacheKey])
  } else {
    console.log('### fetching...', cacheKey, storedCache)
  }

  // cache bypass so we dont have CORS issues with cached images
  // ref: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
  if (options.cacheBust) {
    // eslint-disable-next-line no-param-reassign
    url += (/\?/.test(url) ? '&' : '?') + new Date().getTime()
  }

  const failed = (reason: any): Metadata => {
    let placeholder = ''
    if (options.imagePlaceholder) {
      const parts = options.imagePlaceholder.split(/,/)
      if (parts && parts[1]) {
        placeholder = parts[1]
      }
    }

    let msg = `Failed to fetch resource: ${url}`
    if (reason) {
      msg = typeof reason === 'string' ? reason : reason.message
    }

    if (msg) {
      console.error(msg)
    }

    return {
      blob: placeholder,
      contentType: '',
    }
  }

  const deferred = window
    .fetch(url, options.fetchRequestInit)
    .then((res) =>
      // eslint-disable-next-line promise/no-nesting
      res.blob().then((blob) => ({
        blob,
        contentType: res.headers.get('Content-Type') || '',
      })),
    )
    .then(
      ({ blob, contentType }) =>
        new Promise<Metadata>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () =>
            resolve({
              contentType,
              blob: reader.result as string,
            })
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }),
    )
    .then(({ blob, contentType }) => {
      const resultBlob = {
        contentType,
        blob: parseDataUrlContent(blob),
      }
      storedCache[cacheKey] = resultBlob
      setLocalStorage(CACHING_KEY, JSON.stringify(storedCache))
      return resultBlob
    })
    // on failed
    .catch(failed)

  // cache result
  // cache[cacheKey] = deferred

  return deferred
}
