export function getTeacherMenuitems(pagePath, activityStatus = "") {
  return [
    {
      name: "Dashboard",
      url: "/lerarenkamer",
      icon: "dashboard",
      datacy: "teacher-menu-dashboard",
      selected: (pagePath === "/lerarenkamer"),
    },
    {
      name: "Concept activiteiten",
      url: "/lerarenkamer/concept-activiteiten",
      icon: "textdocument",
      datacy: "teacher-menu-concept-activity",
      selected: (pagePath === "/lerarenkamer/concept-activiteiten" || pagePath === "/lerarenkamer/activiteit/maken-leerdoel-zoeken" || activityStatus === "draft"),
    },
    {
      name: "Open activiteiten",
      url: "/lerarenkamer/open-activiteiten",
      icon: "progress",
      datacy: "teacher-menu-open-activity",
      selected: (pagePath === "/lerarenkamer/open-activiteiten" || activityStatus === "open"),
    },
    {
      name: "Gepubliceerde activiteiten",
      url: "/lerarenkamer/gepubliceerde-activiteiten",
      icon: "document",
      datacy: "teacher-menu-published-activity",
      selected: (pagePath === "/lerarenkamer/gepubliceerde-activiteiten" || activityStatus === "published"),
    },
    {
      name: "Lesmodules",
      url: "/lerarenkamer/modules",
      icon: "calendar",
      datacy: "teacher-menu-modules",
      selected: (pagePath === "/lerarenkamer/modules" || pagePath === "/lerarenkamer/module/maken"),
    }
  ];
}