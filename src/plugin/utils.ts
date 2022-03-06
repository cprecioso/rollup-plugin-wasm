export const groupBy = <T, K extends string>(
  collection: Iterable<T>,
  keyer: (item: T) => K
): Map<K, T[]> => {
  const map = new Map<K, T[]>()

  for (const item of collection) {
    const key = keyer(item)
    const saved = map.get(key)
    const arr = saved ?? []
    arr.push(item)
    if (!saved) map.set(key, arr)
  }

  return map
}
