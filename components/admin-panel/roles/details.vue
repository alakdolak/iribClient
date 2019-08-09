<template>
  <div>
    <div v-if="!selectedRole">
      <div class="text-center mt-4">
        <loader></loader>CHOOSE ROLE TO SHOW HERE
      </div>
    </div>

    <div class="row" v-else>
      <!--dashboard-->
      <div class="col-sm-6 border">
        <div class="main">
          <h4 class="text-primary">
            <b-form-checkbox
              switch
              v-model="selected"
              :ref="permissions.dashboardOverall.value"
              :value="permissions.dashboardOverall.value"
              @change="updateRole(permissions.dashboardOverall.value)"
              class="subCheckbox"
            >{{permissions.dashboardOverall.text}}</b-form-checkbox>
          </h4>
          <div class="sub">
            <b-form-group>
              <b-form-checkbox
                switch
                v-for="option in permissions.dashboards"
                v-model="selected"
                :key="option.value"
                :value="option.value"
                :ref="option.value"
                v-if="checkIfExists(permissions.dashboardOverall.value)"
                @change="updateRole(option.value)"
                class="subCheckbox"
              >{{ option.text }}</b-form-checkbox>
            </b-form-group>
          </div>
        </div>
      </div>

      <!--news-->
      <div class="col-sm-6 border">
        <div class="main">
          <h4 class="text-primary">
            <b-form-checkbox
              switch
              v-model="selected"
              :ref="permissions.newsOverall.value"
              :value="permissions.newsOverall.value"
              @change="updateRole(permissions.newsOverall.value)"
              class="subCheckbox"
            >{{permissions.newsOverall.text}}</b-form-checkbox>
          </h4>
        </div>
        <div class="sub">
          <b-form-group>
            <b-form-checkbox
              switch
              v-for="option in permissions.news"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              v-if="checkIfExists(permissions.newsOverall.value)"
              :ref="option.value"
              @change="updateRole(option.value)"
              class="subCheckbox"
            >{{ option.text }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>

      <!--COMMENTS-->
      <div class="col-sm-6 border">
        <div class="main">
          <h4 class="text-primary">
            <b-form-checkbox
              switch
              v-model="selected"
              :ref="permissions.commentsOverall.value"
              :value="permissions.commentsOverall.value"
              @change="updateRole(permissions.commentsOverall.value)"
              class="subCheckbox"
            >{{permissions.commentsOverall.text}}</b-form-checkbox>
          </h4>
        </div>
        <div class="sub">
          <b-form-group>
            <b-form-checkbox
              switch
              v-for="option in permissions.comments"
              v-if="checkIfExists(permissions.commentsOverall.value)"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              :ref="option.value"
              @change="updateRole(option.value)"
              class="subCheckbox"
            >{{ option.text }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>

      <!--live feeds-->
      <div class="col-sm-6 border">
        <div class="main">
          <h4 class="text-primary">
            <b-form-checkbox
              switch
              v-model="selected"
              :ref="permissions.liveFeedsOverall.value"
              :value="permissions.liveFeedsOverall.value"
              @change="updateRole(permissions.liveFeedsOverall.value)"
              class="subCheckbox"
            >{{permissions.liveFeedsOverall.text}}</b-form-checkbox>
          </h4>
        </div>
        <div class="sub">
          <b-form-group>
            <b-form-checkbox
              switch
              v-for="option in permissions.live"
              v-if="checkIfExists(permissions.liveFeedsOverall.value)"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              :ref="option.value"
              @change="updateRole(option.value)"
              class="subCheckbox"
            >{{ option.text }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>

      <!--modules-->
      <div class="col-sm-6 border">
        <div class="main">
          <h4 class="text-primary">
            <b-form-checkbox
              switch
              v-model="selected"
              :ref="permissions.modulesOverall.value"
              :value="permissions.modulesOverall.value"
              @change="updateRole(permissions.modulesOverall.value)"
              class="subCheckbox"
            >{{permissions.modulesOverall.text}}</b-form-checkbox>
          </h4>
        </div>
        <div class="sub">
          <b-form-group>
            <b-form-checkbox
              switch
              v-for="option in permissions.modules"
              v-if="checkIfExists(permissions.modulesOverall.value)"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              :ref="option.value"
              @change="updateRole(option.value)"
              class="subCheckbox"
            >{{ option.text }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>

      <!--MENUS-->
      <div class="col-sm-6 border">
        <div class="main">
          <h4 class="text-primary">
            <b-form-checkbox
              switch
              v-model="selected"
              :ref="permissions.menusOverall.value"
              :value="permissions.menusOverall.value"
              @change="updateRole(permissions.menusOverall.value)"
              class="subCheckbox"
            >{{permissions.menusOverall.text}}</b-form-checkbox>
          </h4>
        </div>
        <div class="sub">
          <b-form-group>
            <b-form-checkbox
              switch
              v-for="option in permissions.menus"
              v-if="checkIfExists(permissions.menusOverall.value)"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              :ref="option.value"
              @change="updateRole(option.value)"
              class="subCheckbox"
            >{{ option.text }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>

      <!--DESIGNS-->
      <div class="col-sm-6 border">
        <div class="main">
          <h4 class="text-primary">
            <b-form-checkbox
              switch
              v-model="selected"
              :ref="permissions.designOverall.value"
              :value="permissions.designOverall.value"
              @change="updateRole(permissions.designOverall.value)"
              class="subCheckbox"
            >{{permissions.designOverall.text}}</b-form-checkbox>
          </h4>
        </div>
        <div class="sub">
          <b-form-group>
            <b-form-checkbox
              switch
              v-for="option in permissions.designs"
              v-if="checkIfExists(permissions.designOverall.value)"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              :ref="option.value"
              @change="updateRole(option.value)"
              class="subCheckbox"
            >{{ option.text }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>

      <!--roles-->
      <div class="col-sm-6 border">
        <div class="main">
          <h4 class="text-primary">
            <b-form-checkbox
              switch
              v-model="selected"
              :ref="permissions.rolesOverall.value"
              :value="permissions.rolesOverall.value"
              @change="updateRole(permissions.rolesOverall.value)"
              class="subCheckbox"
            >{{permissions.rolesOverall.text}}</b-form-checkbox>
          </h4>
        </div>
        <div class="sub">
          <b-form-group>
            <b-form-checkbox
              switch
              v-for="option in permissions.roles"
              v-if="checkIfExists(permissions.rolesOverall.value)"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              :ref="option.value"
              @change="updateRole(option.value)"
              class="subCheckbox"
            >{{ option.text }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>
      <!--users-->
      <div class="col-sm-6 border">
        <div class="main">
          <h4 class="text-primary">
            <b-form-checkbox
              switch
              v-model="selected"
              :ref="permissions.usersOverall.value"
              :value="permissions.usersOverall.value"
              @change="updateRole(permissions.usersOverall.value)"
              class="subCheckbox"
            >{{permissions.usersOverall.text}}</b-form-checkbox>
          </h4>
        </div>
        <div class="sub">
          <b-form-group>
            <b-form-checkbox
              switch
              v-for="option in permissions.users"
              v-if="checkIfExists(permissions.usersOverall.value)"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              :ref="option.value"
              @change="updateRole(option.value)"
              :switch="true"
              class="subCheckbox"
            >{{ option.text }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from "~/components/shared/dotLoader";

export default {
  name: "rolesDetail",
  props: ["selectedRole"],
  components: {
    loader
  },
  data() {
    return {
      selected: [],
      permissions: {
        dashboardOverall: {
          text: "DASHBOARD",
          value: "dashboardOverall"
        },
        dashboards: [
          //{ text: "Read dashboard", value: "dashboardRead" }
        ],
        newsOverall: { text: "newsOverall", value: "newsOverall" },
        news: [
          //{ text: "Read news", value: "newsRead" },
          //{ text: "Send news to module", value: "newsSend" }, // newsSend: false,
          //{ text: "reject news ", value: "newsReject" } // newsReject: false,
        ],
        commentsOverall: { text: "COMMENTS", value: "commentsOverall" },
        comments: [
          //{ text: "Read Comments", value: "commentsRead" }, // commentsRead: false,
          //{ text: "Approve/Moderate comments", value: "commentsAction" } // commentsAction: false,
        ],
        liveFeedsOverall: {
          text: "LIVE FEEDS",
          value: "liveFeedsOverall"
        },
        live: [
          //{ text: "Read live feeds", value: "liveRead" }, //  liveRead: false,
          //{ text: "Create new live feeds", value: "liveCreate" } //   liveCreate: false,
        ],
        modulesOverall: { text: "MODULES", value: "modulesOverall" },
        modules: [
          //{ text: "Read modules", value: "modulesRead" }, //  modulesRead: false,
          //{ text: "Create new module", value: "modulesCreate" }, //  modulesCreate: false,
          //{ text: "Change Active news in modules", value: "modulesActive" }, //   modulesActive: false,
          //{ text: "Change module setting", value: "modulesSetting" } //   modulesSetting: false,
        ],
        menusOverall: { text: "MENUS", value: "menusOverall" },
        menus: [
          //{ text: "Read menus", value: "menusRead" }, //menusRead: false,
          //{ text: "Change header setting", value: "headerSetting" }, //  headerSetting: false,
          //{ text: "Change footer setting", value: "footerSetting" } // footerSetting: false,
        ],
        designOverall: { text: "DESIGNS", value: "designOverall" },
        designs: [
          //{ text: "Read designs", value: "designRead" }, //   designRead: false,
          //{ text: "Create new design pages", value: "designCreate" }, //designCreate: false,
          //{ text: "Change design settings", value: "designSetting" } //  designSetting: false,
        ],
        rolesOverall: { text: "ROLES", value: "rolesOverall" },
        roles: [
          //{ text: "Read roles", value: "rolesRead" }, //rolesRead: false,
          //{ text: "Create new roles", value: "rolesCreate" }, //   rolesCreate: false,
          //{ text: "Edit roles", value: "rolesChange" } //   rolesChange: false,
        ],
        usersOverall: { text: "USERS", value: "usersOverall" },
        users: [
          //{ text: "Create Users", value: "usersCreate" }, //     usersCreate: false,
          //{ text: "Delete Users", value: "usersDelete" } //   usersDelete: false
        ]
      }
    };
  },
  mounted() {
    // console.log(this.$refs)
  },
  methods: {
    async updateRole(value) {
      // await this.updateRole(value);
      // switch (value) {
      //   case this.permissions.dashboardOverall.value:
      //     if (!this.checkIfExists(value)) {
      //     }
      //     break;
      //   default:
      //     console.log("error finding");
      // }
    },
    updateRole(value, forceStatus = null) {
      let status = false;
      if (!this.selected.includes(value)) status = true;
      if (this.forceStatus) status = forceStatus;
      this.$axios
        .post("/api/roles/update", {
          id: this.selectedRole.id,
          value: value,
          status: status
        })
        .then(data => {
          this.$emit("updateRole", data.data.role);
        })
        .catch(err => {
          console.log(err);
          console.log(
            "something went wrong trying to update role in the database"
          );
        });
    },
    checkIfExists(value) {
      return this.selected.includes(value);
    }
  },
  watch: {
    selectedRole() {
      this.selected = [];
      for (const item in this.selectedRole)
        if (this.selectedRole[item] === true) {
          this.selected.push(item);
        }
    }
  }
};
</script>

<style>
.custom-control-label {
  font-weight: normal !important;
}

.sub {
  padding-left: 20px;
}

.subCheckbox {
  margin-top: 20px;
  font-size: 1.2em;
  line-height: 20px;
}

.col-sm-6 {
  /*border: 1px solid lightgray;*/
  padding: 20px;
}
</style>
