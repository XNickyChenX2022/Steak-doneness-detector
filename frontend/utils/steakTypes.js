const types = {
  blue_rare: "blue rare",
  rare: "rare",
  medium_rare: "medium rare",
  medium: "medium",
  medium_well_done: "medium well done",
  well_done: "well done",
};
function categorizeCookingType(cookingStatus, setSteakType) {
  switch (cookingStatus) {
    case "blue_rare":
      return types.blue_rare;
    case "rare":
      return types.rare;
    case "medium_rare":
      return types.medium_rare;
    case "medium":
      return types.medium;
    case "medium_well_done":
      return types.medium_well_done;
    case "well_done":
      return types.well_done;
    default:
      return "Unknown";
  }
}
export default categorizeCookingType;
