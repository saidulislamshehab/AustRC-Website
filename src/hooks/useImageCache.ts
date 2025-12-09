import { useState, useEffect, useCallback } from 'react';

const CACHE_PREFIX = 'austrc_image_cache_';
const CACHE_EXPIRY = 1000 * 60 * 60 * 24 * 7; // 7 days

interface CachedImage {
  url: string;
  data: string;
  timestamp: number;
}

export function useImageCache(imageUrl: string): string {
  const [cachedUrl, setCachedUrl] = useState<string>(imageUrl);
  const [isLoading, setIsLoading] = useState(true);

  const getCacheKey = useCallback((url: string) => {
    return CACHE_PREFIX + btoa(url);
  }, []);

  const isCacheExpired = useCallback((timestamp: number) => {
    return Date.now() - timestamp > CACHE_EXPIRY;
  }, []);

  const getCachedImage = useCallback(async (): Promise<string | null> => {
    try {
      const cacheKey = getCacheKey(imageUrl);

      if ('indexedDB' in window) {
        return await getFromIndexedDB(cacheKey, imageUrl);
      }

      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsedCache: CachedImage = JSON.parse(cached);
        if (!isCacheExpired(parsedCache.timestamp)) {
          return parsedCache.data;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (error) {
      console.warn('Error accessing cache:', error);
    }
    return null;
  }, [imageUrl, getCacheKey, isCacheExpired]);

  const cacheImage = useCallback(async (url: string, dataUrl: string) => {
    try {
      const cacheKey = getCacheKey(url);
      const cacheData: CachedImage = {
        url,
        data: dataUrl,
        timestamp: Date.now(),
      };

      if ('indexedDB' in window) {
        await saveToIndexedDB(cacheKey, cacheData);
      } else {
        try {
          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        } catch (e) {
          console.warn('LocalStorage full, clearing old cache entries');
          clearOldCacheEntries();
        }
      }
    } catch (error) {
      console.warn('Error saving to cache:', error);
    }
  }, [getCacheKey]);

  const fetchAndCacheImage = useCallback(async () => {
    try {
      setIsLoading(true);

      const cached = await getCachedImage();
      if (cached) {
        setCachedUrl(cached);
        setIsLoading(false);
        return;
      }

      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');

      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        setCachedUrl(dataUrl);

        await cacheImage(imageUrl, dataUrl);
        setIsLoading(false);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error fetching image:', error);
      setCachedUrl(imageUrl);
      setIsLoading(false);
    }
  }, [imageUrl, getCachedImage, cacheImage]);

  useEffect(() => {
    fetchAndCacheImage();
  }, [fetchAndCacheImage]);

  return cachedUrl;
}

async function getFromIndexedDB(key: string, originalUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open('AustRCImageCache', 1);

      request.onerror = () => resolve(null);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images');
        }
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction('images', 'readonly');
        const store = transaction.objectStore('images');
        const getRequest = store.get(key);

        getRequest.onsuccess = () => {
          const cached = getRequest.result as CachedImage | undefined;
          if (cached && !isExpired(cached.timestamp)) {
            resolve(cached.data);
          } else {
            resolve(null);
          }
        };

        getRequest.onerror = () => resolve(null);
      };
    } catch (error) {
      resolve(null);
    }
  });
}

async function saveToIndexedDB(key: string, data: CachedImage): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open('AustRCImageCache', 1);

      request.onerror = () => reject('Failed to open IndexedDB');

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images');
        }
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction('images', 'readwrite');
        const store = transaction.objectStore('images');
        const putRequest = store.put(data, key);

        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject('Failed to save to IndexedDB');
      };
    } catch (error) {
      reject(error);
    }
  });
}

function isExpired(timestamp: number): boolean {
  return Date.now() - timestamp > CACHE_EXPIRY;
}

function clearOldCacheEntries(): void {
  try {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key.startsWith(CACHE_PREFIX)) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item) as CachedImage;
            if (isExpired(parsed.timestamp)) {
              localStorage.removeItem(key);
            }
          }
        } catch (e) {
          localStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    console.warn('Error clearing old cache entries:', error);
  }
}

export function clearImageCache(): void {
  try {
    if ('indexedDB' in window) {
      const deleteRequest = indexedDB.deleteDatabase('AustRCImageCache');
      deleteRequest.onsuccess = () => console.log('IndexedDB cache cleared');
    }

    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}
