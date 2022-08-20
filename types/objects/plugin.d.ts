type PluginConfig = {
  isActive: boolean;
  appliedTo: {
    id: string;
    name: string;
    code: object;
    type: "USER" | "ORGANIZATION" | "ROLE";
  }[]
}