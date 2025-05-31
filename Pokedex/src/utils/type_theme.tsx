export function getTypeTheme(type: string) {
  return {
    base: `--color-${type}`,
    shade: `--color-${type}-shade`,
    tint: `--color-${type}-tint`,
    dark: `--color-${type}-dark`,
  };
}
