export default {
  dbs: "mongodb://127.0.0.1:27017/meituan",
  redis: {
    get host() {
      return "127.0.0.1";
    },
    get port() {
      return 6379;
    }
  },
  smtp: {
    get host() {
      return "smtp.qq.com";
    },
    get user() {
      return "646676256@qq.com"; //发邮件的帐号
    },
    get pass() {
      return "aifyyjopwsnnbbaf";
    },
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase();
      };
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 1000;
      };
    }
  }
};
