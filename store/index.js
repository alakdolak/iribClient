import lodash from "lodash";

export const state = () => ({
  adminTitle: "",
  modules: [],
  siteUser: null,
  detailSidebarModules: [],
  detailMainModules: [],
  pages: [],
  mainRows: [],
  // imageRoot: "http://192.168.201.27/uploads/images/",
  // backendRoot: "http://192.168.200.33/api/images",
  backendRoot: "http://127.0.0.1:3000/api/images/",
  imageRoot: "http://127.0.0.1:3000/uploads/images/",
  user: null
});
export const mutations = {
  setSiteUser(state, user) {
    state.siteUser = user;
  },
  setAdminTitle(state, title = "dashboard") {
    state.adminTitle = title;
  },
  findPageName(state, page) {
    let index = lodash.findIndex(state.pages, function (o) {
      return o.id === page;
    });
    if (index !== -1)
      state.adminTitle = "Design " + state.pages[index].name + " Page";
  },
  setModules(state, modules) {
    state.modules = modules;
  },
  addModule(state, module) {
    state.modules.push(module);
  },
  deleteModule(state, moduleId) {
    lodash.remove(state.modules, function (item) {
      item.id === moduleId
    });
  },
  setPages(state, pages) {
    state.pages = pages;
  },
  addPage(state, page) {
    state.pages.push(page);
  },
  updateModule(state, module) {
    let index = lodash.findIndex(state.modules, {
      id: module.id
    });
    state.modules[index].automatic = module.automatic;
    state.modules[index].newsNumber = module.newsNumber;
    state.modules[index].replaceMode = module.replaceMode;
    state.modules[index].maxActives = module.maxActives;
  },
  addDetailSidebarModule(state, module) {
    state.detailSidebarModules.push(module);
  },
  setDetailSidebarModule(state, module) {
    state.detailSidebarModules = module;
  },
  addDetailMainModule(state, module) {
    state.detailMainModules.push(module);
  },
  setDetailMainModule(state, module) {
    state.detailMainModules = module;
  },
  setMainRows(state, rows) {
    state.mainRows = rows;
  },
  updateRowFluid(state, data) {
    let index = lodash.findIndex(state.mainRows, {
      id: data.row_id
    });
    state.mainRows[index].fluid = data.fluid;
  },
  updateRowTitle(state, data) {
    let index = lodash.findIndex(state.mainRows, {
      id: data.row_id
    });
    state.mainRows[index].title = data.title;
  },
  updateVertical(state, data) {
    let index = lodash.findIndex(state.mainRows, {
      id: data.row_id
    });
    state.mainRows[index].title = data.row.title;
    state.mainRows[index].height = data.row.height;
    state.mainRows[index].width = data.row.width;
    state.mainRows[index].top = data.row.top;
    state.mainRows[index].right = data.row.right;
  },
  deleteMainRows(state, row_id) {
    let index = lodash.findIndex(state.mainRows, {
      id: row_id
    });
    state.mainRows.splice(index, 1);
  },
  setColumnModule(state, data) {
    let index = lodash.findIndex(state.mainRows, {
      id: data.row_id
    });
    for (let i = 0; i < state.mainRows[index].row_columns.length; i++) {
      if (state.mainRows[index].row_columns[i].id == data.column_id) {
        state.mainRows[index].row_columns[i].column_modules.push(
          data.columnModule
        );
      }
    }
  },
  unsetColumnModule(state, data) {
    let index = lodash.findIndex(state.mainRows, {
      id: data.row_id
    });
    console.log(index);
    for (let i = 0; i < state.mainRows[index].row_columns.length; i++) {
      if (state.mainRows[index].row_columns[i].id == data.column_id) {
        for (
          let j = 0;
          j < state.mainRows[index].row_columns[i].column_module.length;
          j++
        ) {
          if (
            state.mainRows[index].row_columns[i].column_module[j].id ==
            column_module_id
          ) {
            state.mainRows[index].row_columns[i].column_module.splice(j, 1);
          }
        }
      }
    }
  },
  changeColumnModuleTitle(state, data) {
    let index = lodash.findIndex(state.mainRows, {
      id: data.row_id
    });
    let column_index = lodash.findIndex(state.mainRows[index].row_columns, {
      id: data.column_id
    });
    let column_module_index = lodash.findIndex(
      state.mainRows[index].row_columns[column_index].column_modules,
      {
        id: data.column_module_id
      }
    );
    state.mainRows[index].row_columns[column_index].column_modules[
      column_module_index
    ].show_title = data.show_title;
  },
  updateMainRowsColumnType(state, data) {
    let row_index = lodash.findIndex(state.mainRows, {
      id: data.row_id
    });
    let column_index = lodash.findIndex(state.mainRows[row_index].row_columns, {
      id: data.column_id
    });
    state.mainRows[row_index].row_columns[column_index].column_type =
      data.column_type;
  },
  setUser(state, data) {
    state.user = data;
  },
  unsetUser(state) {
    state.user = null;
  }
};
