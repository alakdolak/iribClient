function not_permitted(redirect) {
  return redirect("/admin/error403");
}

function check_page_role(role, pageName, redirect) {
  switch (pageName) {
    case "admin":
      if (!role.dashboardOverall) return not_permitted(redirect);
      break;
    case "admin-news":
      if (!role.newsOverall) return not_permitted(redirect);
      break;
    case "admin-live":
      if (!role.liveFeedsOverall) return not_permitted(redirect);
      break;
    case "admin-design":
    case "admin-design-details":
    case "admin-design-main":
    case "admin-design-page":
      if (!role.designOverall) return not_permitted(redirect);
      break;
    case "admin-modules":
    case "admin-modules-id":
      if (!role.modulesOverall) return not_permitted(redirect);
      break;
    case "admin-roles":
      if (!role.rolesOverall) return not_permitted(redirect);
      break;
    case "admin-users":
      if (!role.usersOverall) return not_permitted(redirect);
      break;
    case "admin-comments":
      if (!role.commentsOverall) return not_permitted(redirect);
      break;
    case "admin-menus-footer":
    case "admin-menus-header":
      if (!role.menusOverall) return not_permitted(redirect);
      break;
  }
}

export default function({ $axios, redirect, store, route }) {
  $axios
    .post("/api/siteUser/checkLogin")
    .then(data => {
      if (!data.data.status) {
        store.commit("setSiteUser", null);
        // console.log(redirect("/admin/login"));
        // return redirect("/admin/login");
      } else {
        store.commit("setSiteUser", data.data.user);
        return check_page_role(data.data.user.siteRole, route.name, redirect);
      }
    })
    .catch(err => {
      console.log("hey error is here");
      console.log(err);
      console.log("error when trying to check login session");
    });
}
