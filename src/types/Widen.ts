/**
 * Widens `as const` literal types so a translated copy of a content object can
 * be typed against the original: same shape, any string values.
 */
export type Widen<T> = T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends readonly (infer U)[]
          ? readonly Widen<U>[]
          : T extends object
            ? { -readonly [K in keyof T]: Widen<T[K]> }
            : T;
