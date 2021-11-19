export function getTeacherMenuitems(pagePath, activityStatus = "") {
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
      selected: (pagePath === "/lerarenkamer/concept-activiteiten" || activityStatus === "draft"),
    },
    {
      name: "Open activiteiten",
      url: "/lerarenkamer/open-activiteiten",
      icon: "progress",
      selected: (pagePath === "/lerarenkamer/open-activiteiten" || activityStatus === "open"),
    },
    {
      name: "Gepubliceerde activiteiten",
      url: "/lerarenkamer/gepubliceerde-activiteiten",
      icon: "document",
      selected: (pagePath === "/lerarenkamer/gepubliceerde-activiteiten" || activityStatus === "published"),
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