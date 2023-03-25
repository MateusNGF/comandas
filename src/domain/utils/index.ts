export * from './ObjectManager';
export * from './constantes.utils'

export function ternary(primaryProp: any, secundaryProp: any) {
  return primaryProp ? primaryProp : secundaryProp ?? null;
}

export function append<Content extends object = object>(dest : object, content : Content) {
  return dest = {
    ...dest,
    ...content
  }
}