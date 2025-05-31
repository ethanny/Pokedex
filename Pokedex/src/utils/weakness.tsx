export function getTypesWeakAgainst(type: string): any[] {
  const typeNames = (() => {
    switch (type.toLowerCase()) {
      case "normal":
        return ["rock", "steel", "fighting"];
      case "fighting":
        return ["flying", "poison", "psychic", "bug", "ghost", "fairy"];
      case "flying":
        return ["rock", "steel", "electric"];
      case "poison":
        return ["poison", "ground", "rock", "ghost", "steel"];
      case "ground":
        return ["flying", "bug", "grass"];
      case "rock":
        return ["fighting", "ground", "steel"];
      case "bug":
        return [
          "fighting",
          "flying",
          "poison",
          "ghost",
          "steel",
          "fire",
          "fairy",
        ];
      case "ghost":
        return ["normal", "dark", "ghost"];
      case "steel":
        return ["steel", "fire", "water", "electric"];
      case "fire":
        return ["rock", "fire", "water", "dragon"];
      case "water":
        return ["water", "grass", "dragon"];
      case "grass":
        return ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"];
      case "electric":
        return ["ground", "grass", "electric", "dragon"];
      case "psychic":
        return ["bug", "ghost", "dark"];
      case "ice":
        return ["steel", "fire", "water", "ice"];
      case "dragon":
        return ["steel", "dragon", "fairy"];
      case "dark":
        return ["fighting", "dark", "fairy"];
      case "fairy":
        return ["poison", "steel", "fire"];
      default:
        return [];
    }
  })();

  return typeNames.map((typeName) => ({
    type: {
      name: typeName,
    },
  }));
}
