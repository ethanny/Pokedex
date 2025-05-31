export function getStatColor(stat: string): string {
  switch (stat.toLowerCase()) {
    case "hp":
      return "--color-fighting-shade";
    case "attack":
      return "--color-fire-shade";
    case "defense":
      return "--color-water-shade";
    case "special-attack":
      return "--color-electric-shade";
    case "special-defense":
      return "--color-psychic-shade";
    case "speed":
      return "--color-grass-shade";
    default:
      return "--color-black";
  }
}
