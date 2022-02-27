export function getTeacherMenuitems(pagePath, $t, activityStatus = "") {
  return [
    {
      name: $t("dashboard"),
      url: "/lerarenkamer",
      icon: "dashboard",
      datacy: "teacher-menu-dashboard",
      selected: (pagePath === "/lerarenkamer"),
    },
    {
      name: $t("concept-activities"),
      url: "/lerarenkamer/concept-activiteiten",
      icon: "textdocument",
      datacy: "teacher-menu-concept-activity",
      selected: (pagePath === "/lerarenkamer/concept-activiteiten" || pagePath === "/lerarenkamer/activiteit/maken-leerdoel-zoeken" || activityStatus === "draft"),
    },
    {
      name: $t("open-activities"),
      url: "/lerarenkamer/open-activiteiten",
      icon: "progress",
      datacy: "teacher-menu-open-activity",
      selected: (pagePath === "/lerarenkamer/open-activiteiten" || activityStatus === "open"),
    },
    {
      name: $t("published-activities"),
      url: "/lerarenkamer/gepubliceerde-activiteiten",
      icon: "document",
      datacy: "teacher-menu-published-activity",
      selected: (pagePath === "/lerarenkamer/gepubliceerde-activiteiten" || activityStatus === "published"),
    },
    {
      name: $t("modules"),
      url: "/lerarenkamer/modules",
      icon: "calendar",
      datacy: "teacher-menu-modules",
      selected: (pagePath === "/lerarenkamer/modules" || pagePath === "/lerarenkamer/module/maken"),
    }
  ];
}
