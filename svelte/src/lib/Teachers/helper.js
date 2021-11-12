export function getLoungeMenuitems(pagePath) {
  return [
    {
      name: "Dashboard",
      url: "/lerarenkamer",
      icon: "dashboard",
      selected: (pagePath === "/lerarenkamer"),
    },
    {
      name: "Concept activiteiten",
      url: "/lerarenkamer/concept-activiteiten",
      icon: "textdocument",
      selected: (pagePath === "/lerarenkamer/concept-activiteiten"),
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