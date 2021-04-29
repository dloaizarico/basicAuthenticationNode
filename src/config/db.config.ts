let config: IConfig

config = {
    HOST: "localhost",
    PORT: 27017,
    DB: "ordering_db",
    USERNAME: "admin",
    PASSWORD: "admin"
  };

  export type IConfig = {

    HOST: String,
    PORT: Number,
    DB: String,
    USERNAME: String,
    PASSWORD: String

     
  }

  export default config