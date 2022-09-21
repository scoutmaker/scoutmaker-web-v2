import { diff } from 'deep-object-diff'

export const isDiffrent = (o1: {}, o2: {}) => !!Object.keys(diff(o1, o2)).length
