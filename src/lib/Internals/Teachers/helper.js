export function getTeacherMenuitems(pagePath, $t, activityStatus = "") {
  return [
    // {
    //   name: $t("dashboard"),
    //   url: "/lerarenkamer",
    //   icon: "dashboard",
    //   datacy: "teacher-menu-dashboard",
    //   selected: (pagePath === "/lerarenkamer"),
    // },
    {
      name: $t("modules"),
      url: "/lerarenkamer/modules",
      icon: "calendar",
      datacy: "teacher-menu-modules",
      selected: (pagePath === "/lerarenkamer/modules" || pagePath.startsWith("/lerarenkamer/module/")),
    },
    {
      name: $t("activities"),
      url: "/lerarenkamer/activiteiten",
      icon: "document",
      datacy: "teacher-menu-activity",
      selected: (pagePath === "/lerarenkamer/activiteiten"),
    },
 
  ];
}
