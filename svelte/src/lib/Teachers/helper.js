export function getLoungeMenuitems(pagePath) {
  console.log(pagePath);
  return [
    {
      name: "Dashboard",
      url: "/lerarenkamer",
      icon: "dashboard",
      selected: (pagePath === "/lerarenkamer"),
    },
    {
      name: "Open activiteiten",
      url: "/lerarenkamer/open-activiteiten",
      icon: "progress",
      selected: (pagePath === "/lerarenkamer/open-activiteiten" || pagePath.startsWith("/lerarenkamer/activiteit/")),
    },
    {
      name: "Gepubliceerde activiteiten",
      url: "/lerarenkamer/gepubliceerde-activiteiten",
      icon: "document",
      selected: (pagePath === "/lerarenkamer/gepubliceerde-activiteiten"),
    },
    {
      name: "Modules",
      url: "/lerarenkamer/modules",
      icon: "calendar",
      selected: (pagePath === "/lerarenkamer/modules"),
    },
    {
      name: "Leslokaal",
      url: "/lerarenkamer/leslokaal",
      icon: "people",
      selected: (pagePath === "/lerarenkamer/leslokaal"),
    }
  ];
}