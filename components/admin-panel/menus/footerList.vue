<template>
  <div>
    <div v-if="list">
      <ul class="list-group text-center">
        <li class="list-group-item list-group-item-active">
          <input
            type="text"
            class="form-control form-control-lg"
            v-model="list.title"
            @change="changeTitle"
          />
        </li>
        <li class="list-group-item">
          <b-button
            variant="outline-secondary"
            class="btn btn-block btn-outline-secondary"
            @click="showModal"
          >Add new item</b-button>
        </li>
        <li
          class="list-group-item list-group-item-action"
          v-for="item in list.footerListItems"
          :key="item.id"
        >
          <div class="row">
            <div class="col-sm-8">
              {{item.text}}
              <br />
              type: {{translateType(item.type)}}
              <br />
              <div v-if="item.type === 3">Redirects to : {{item.url}}</div>
            </div>
            <div class="col-sm-4">
              <button class="btn btn-sm btn-info" @click="showEditModal(item)">Edit</button>
              <button
                class="btn btn-sm btn-danger"
                v-b-popover.hover="'Delete item'"
                @click="deleteItem(item.id)"
              >X</button>
            </div>
          </div>
        </li>
      </ul>

      <!-- creating new item modal  -->
      <b-modal title="Add new Item" hide-footer :ref="String(list.id)" :id="String(list.id)">
        <div class="alert alert-danger text-center mt-1 mb-3" v-if="error">{{error}}</div>
        <div class="form-group">
          <label for>Type:</label>
          <select v-model="type" class="form-control" @change="changeItems(type)">
            <option
              :value="option.value"
              v-for="option in typeOptions"
              :key="option.value"
            >{{option.text}}</option>
          </select>
        </div>
        <div class="form-group" v-if="type !== 3">
          <label for>Item:</label>
          <select class="form-control" v-model="selectedItem" @change="changeText">
            <option :value="item.value" v-for="item in items" :key="item.value">{{item.text}}</option>
          </select>
        </div>
        <div class="form-group" v-else>
          <label>URL :</label>
          <input type="text" v-model="url" class="form-control" placeholder="enter your url here" />
        </div>
        <div class="form-group">
          <label for>Text:</label>
          <input type="text" v-model="text" class="form-control" placeholder="enter your text here" />
        </div>
        <div class="form-group">
          <button class="btn btn-block btn-outline-primary" @click="addItem">Add</button>
        </div>
      </b-modal>

      <!-- editing modal  -->
      <b-modal title="Edit Utem" hide-footer ref="editModal" id="editModal">
        <div class="alert alert-danger text-center mt-1 mb-3" v-if="error">{{error}}</div>
        <div class="form-group">
          <label for>Type:</label>
          <select v-model="edit.type" class="form-control" @change="changeItems(edit.type)">
            <option
              :value="option.value"
              v-for="option in typeOptions"
              :key="option.value"
            >{{option.text}}</option>
          </select>
        </div>
        <div class="form-group" v-if="edit.type !== 3">
          <label for>Item:</label>
          <select class="form-control" v-model="edit.selectedItem" @change="changeText">
            <option :value="item.value" v-for="item in items" :key="item.value">{{item.text}}</option>
          </select>
        </div>
        <div class="form-group" v-else>
          <label>URL :</label>
          <input
            type="text"
            v-model="edit.url"
            class="form-control"
            placeholder="enter your url here"
          />
        </div>
        <div class="form-group">
          <label for>Text:</label>
          <input
            type="text"
            v-model="edit.text"
            class="form-control"
            placeholder="enter your text here"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-block btn-outline-primary" @click="updateItem">Update</button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "footerList",
  props: ["list", "data"],
  created() {
    this.changeItems(0);
  },
  data() {
    return {
      error: "",
      ListTitle: "",
      type: 0,
      text: "",
      url: "",
      selectedItem: 1,
      edit: {
        id: 0,
        type: 0,
        text: "",
        url: "",
        selectedItem: 1
      },
      typeOptions: [
        { text: "Page", value: 0 },
        // { text: "Category", value: 1 },
        { text: "Sub Category", value: 2 },
        { text: "URL", value: 3 }
      ],
      items: []
    };
  },
  methods: {
    showModal() {
      this.$refs[this.list.id].show();
    },
    showEditModal(listItem) {
      this.edit.id = listItem.id;
      this.edit.type = listItem.type;
      this.edit.url = listItem.url;
      this.edit.text = listItem.text;
      switch (listItem.type) {
        case 0:
          this.edit.selectedItem = listItem.pageId;
          break;
        case 1:
          this.edit.selectedItem = listItem.categoryId;
          break;
        case 2:
          this.edit.selectedItem = listItem.subCategoryId;
          break;
        case 3:
          break;
      }
      this.changeItems(listItem.type);
      this.$refs.editModal.show();
    },
    translateType(type) {
      switch (type) {
        case 0:
          return "Page";
          break;
        case 1:
          return "Category";
          break;
        case 2:
          return "Sub Category";
          break;
        case 3:
          return "URL";
          break;
      }
    },
    changeTitle() {
      this.$axios
        .post("/api/footer/title", {
          id: this.list.id,
          title: this.list.title
        })
        .then(data => {})
        .catch(err => {
          console.log("error changing title");
        });
    },
    changeText() {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === this.selectedItem) {
          this.text = this.items[i].text;
        }
      }
    },
    changeItems(type) {
      this.items = [];
      if (type === 0) {
        if (this.data.pages) {
          for (let i = 0; i < this.data.pages.length; i++) {
            this.items[i] = { text: "", value: 0 };
            this.items[i].text = this.data.pages[i].name;
            this.items[i].value = this.data.pages[i].id;
          }
        }
      } else if (type === 1) {
        if (this.data.categories) {
          for (let i = 0; i < this.data.categories.length; i++) {
            this.items[i] = { text: "", value: 0 };
            this.items[i].text = this.data.categories[i].englishTitle;
            this.items[i].value = this.data.categories[i].id;
          }
        }
      } else if (type === 2) {
        if (this.data.subCategories) {
          for (let i = 0; i < this.data.subCategories.length; i++) {
            this.items[i] = { text: "", value: 0 };
            this.items[i].text = this.data.subCategories[i].englishTitle;
            this.items[i].value = this.data.subCategories[i].id;
          }
        }
      } else {
        this.items = [];
        this.text = "";
      }
      this.changeText();
    },
    addItem() {
      if (
        (this.selectedItem && this.text) ||
        (this.type === 4 && this.url && this.text)
      ) {
        this.$axios
          .post("/api/footer/item", {
            text: this.text,
            id: this.selectedItem,
            type: this.type,
            footerListId: this.list.id,
            url: this.url
          })
          .then(data => {
            this.text = "";
            this.type = 0;
            this.selectedItem = 1;
            this.url = "";
            this.$refs[this.list.id].hide();
            this.$emit("addItem");
            this.error = "";
          })
          .catch(err => {
            console.log(err);
            console.log(
              "something went wrong adding new item in footer list component"
            );
          });
      } else {
        this.error = "you need to fill all the fields.";
      }
    },
    updateItem() {
      this.$axios
        .post("/api/footer/item/update", {
          id: this.edit.id,
          selectedItem: this.edit.selectedItem,
          url: this.edit.url,
          type: this.edit.type,
          text: this.edit.text
        })
        .then(data => {
          this.changeItems(1);
          this.changeText();
          this.$emit("addItem");
          this.$refs.editModal.hide();
        })
        .catch(err => {
          console.log("error happened in update Item");
        });
    },
    deleteItem(id) {
      this.$axios
        .post("/api/footer/item/delete", {
          id: id
        })
        .then(data => {
          this.$emit("addItem");
        })
        .catch(err => {
          console.log("error deleting item");
        });
    }
  }
};
</script>

<style scoped>
</style>
