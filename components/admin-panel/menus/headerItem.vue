<template>
  <div v-if="item">
    <div class="float-left title">{{item.text}}</div>
    <div class="float-right">
      <div class="btn-group">
        <button
          v-if="showAddButton"
          class="btn btn-sm"
          v-b-tooltip.hover
          title="Add sub menu"
          @click="toggleAddSubHeaderItemModal(item.id)"
        >
          <i class="fa fa-plus-square-o" aria-hidden="true"></i>
        </button>
        <button
          class="btn btn-sm"
          v-b-tooltip.hover
          title="Edit Item"
          @click="toggleEditSubheaderItemModal(item)"
        >
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button
          class="btn btn-sm"
          v-b-tooltip.hover
          title="Delete Item"
          @click="deleteHeaderItem(item.id)"
        >
          <i class="fa fa-window-close-o" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <!-- new sub header item modal -->
    <b-modal id="newSubHeaderItem" ref="newSubHeaderItem" title="Add sub menu item" hide-footer>
      <div class="form-group">
        <div class="alert alert-danger text-center" v-if="modalError">{{modalError}}</div>
      </div>
      <div class="form-group">
        <label for>Name:</label>
        <input type="text" class="form-control" placeholder="Enter item name here" v-model="text">
      </div>
      <div class="form-group">
        <label for>Redirect Type:</label>
        <select class="form-control" v-model="redirectType" @change="changeRedirectType">
          <option :value="0">Page</option>
          <option :value="1">Category</option>
          <option :value="2">Sub Category</option>
        </select>
      </div>
      <div class="form-group">
        <label>Redirect To :</label>
        <select class="form-control" v-model="redirect">
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >{{option.text}}</option>
        </select>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" @click="addSubHeaderItem">Add Item</button>
      </div>
    </b-modal>

    <!-- edit header item -->
    <b-modal id="editHeaderItem" ref="editHeaderItem" title="Edit Item" hide-footer>
      <div class="form-group">
        <div class="alert alert-danger text-center" v-if="modalError">{{modalError}}</div>
      </div>
      <div class="form-group">
        <label for>Name:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter item name here"
          v-model="editText"
        >
      </div>
      <div class="form-group">
        <label for>Redirect Type:</label>
        <select class="form-control" v-model="redirectType" @change="changeRedirectType">
          <option :value="0">Page</option>
          <option :value="1">Category</option>
          <option :value="2">Sub Category</option>
        </select>
      </div>
      <div class="form-group">
        <label>Redirect To :</label>
        <select class="form-control" v-model="editRedirect">
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >{{option.text}}</option>
        </select>
      </div>
      <div class="form-group">
        <button class="btn btn-warning btn-block" @click="editHeaderItem">Edit Item</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "headerItem",
  props: ["addButton", "item", "level", "pages", "categories", "subCategories"],
  data() {
    return {
      showAddButton: true,
      // new header item modal
      text: "",
      redirect: null,
      redirectType: 0,
      parentId: null,
      options: [],
      modalError: "",

      // edit header item
      editText: "",
      editRedirect: null,
      editId: null
    };
  },
  created() {
    if (this.addButton != null) {
      this.showAddButton = this.addButton;
    }
    this.changeRedirectType();
  },
  methods: {
    changeRedirectType() {
      this.options = [];
      if (this.redirectType === 0) {
        for (let i = 0; i < this.pages.length; i++) {
          this.options.push({
            text: this.pages[i].name,
            value: this.pages[i].id
          });
        }
      } else if (this.redirectType === 1) {
        for (let i = 0; i < this.categories.length; i++) {
          this.options.push({
            text: this.categories[i].englishTitle,
            value: this.categories[i].id
          });
        }
      } else {
        for (let i = 0; i < this.subCategories.length; i++) {
          this.options.push({
            text: this.subCategories[i].englishTitle,
            value: this.subCategories[i].id
          });
        }
      }
    },
    toggleAddSubHeaderItemModal(id) {
      this.parentId = id;
      this.$refs.newSubHeaderItem.show();
    },
    toggleEditSubheaderItemModal(item) {
      this.editId = item.id;
      this.editText = item.text;
      this.redirectType = item.redirectType;
      this.changeRedirectType();
      this.editRedirect = item.redirect;
      this.$refs.editHeaderItem.show();
    },
    addSubHeaderItem() {
      if (!this.text || !this.redirect) {
        this.modalError = "all inputs should be filled";
        return;
      } else {
        this.$axios
          .post("/api/header/items/addSub", {
            parentId: this.parentId,
            text: this.text,
            redirect: this.redirect,
            redirectType: this.redirectType
          })
          .then(data => {
            this.text = "";
            this.redirectType = 0;
            this.changeRedirectType();
            this.redirect = null;
            this.modalError = "";
            this.error = "";
            this.$emit("onItemAdded", data.data.headerItem);
            this.$refs.newSubHeaderItem.hide();
          })
          .catch(err => {
            console.log(err);
            this.error =
              "something went wrong trying to save data to the database";
          });
      }
    },
    editHeaderItem() {
      if (!this.editText || !this.editRedirect) {
        this.modalError = "all inputs should be filled";
        return;
      } else {
        this.$axios
          .post("/api/header/items/edit", {
            id: this.editId,
            text: this.editText,
            redirectType: this.redirectType,
            redirect: this.editRedirect
          })
          .then(data => {
            this.editId = null;
            this.editText = "";
            this.redirectType = 0;
            this.changeRedirectType();
            this.editRedirect = null;
            this.$refs.editHeaderItem.hide();
            this.$emit("onEditItem", data.data.headerItem);
          })
          .catch(err => {
            this.error =
              "something went wrong trying to save data to the database";
            console.log(err);
          });
      }
    },
    deleteHeaderItem(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$axios
            .post("api/header/items/delete", {
              id: id
            })
            .then(data => {
              this.$emit("onItemDeleted", id);
              this.$swal("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(err => {
              console.log(err);
              this.error =
                "something went wrong trying to delete data from the database";
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 1.2em;
}
</style>

