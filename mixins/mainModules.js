import moment from 'moment';
export default {
  methods: {
    getNews(moduleNews) {
      let news = [];
      if (moduleNews.length && moduleNews[0].news) {
        for (let i = 0; i < moduleNews.length; i++) {
          news.push(moduleNews[i].news);
          if (i == moduleNews.length - 1) {
            return news;
          }
        }
      } else {
        return moduleNews
      }
    },
    getTime(createdAt) {
      var time = createdAt.substring(0, 10);
      console.log(time);
      return moment(time, "YYYY-MM-DD").fromNow();
    },
    translate_description(news, descriptionType) {
      switch (descriptionType) {
        case 1:
          if (news.title) return news.title;
          else return news.title;
          break;
        case 2:
          if (news.title2) return news.title2;
          else return news.title;
          break;
        case 3:
          if (news.lead) return news.lead;
          else return news.title;
          return;
          break;
        case 4:
          if (news.content) return news.content;
          else return news.title;
          break;
      }
    },
    truncate: function (text, length) {
      if (text.length > length) return text.substring(0, length) + "...";
      else return text;
    },
    test() {
      console.log("testing from mixin");
    }
  }
};
