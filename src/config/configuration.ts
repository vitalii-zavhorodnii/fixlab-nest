interface IConfigurationFile {
  app: {
    port: number | undefined;
    jwtsecret: string | undefined;
    initkey: string | undefined;
  };
  database: {
    link: string | undefined;
    username: string | undefined;
    password: string | undefined;
    dbname: string | undefined;
  };
  smtp: {
    user: string | undefined;
    password: string | undefined;
    host: string | undefined;
    port: string | undefined;
  };
}

export default (): IConfigurationFile => ({
  app: {
    port: parseInt(process.env.PORT || '4000'),
    jwtsecret: process.env.SECRET,
    initkey: process.env.D_ADMIN_KEY
  },
  database: {
    link: process.env.MONGO_DB_LINK,
    username: process.env.MONGO_DB_AUTH_USERNAME,
    password: process.env.MONGO_DB_AUTH_PASSWORD,
    dbname: process.env.MONGO_DB_NAME
  },
  smtp: {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_DOMAIN,
    port: process.env.SMTP_PORT
  }
});
