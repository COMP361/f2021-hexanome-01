const database = {
    development:   {
      type: "postgres",
      host: "elfenroads.westus3.cloudapp.azure.com",
      port: 5432,
      username: "postgres",
      password: "jyang285",
      database: "elfenroadd",
      entities: [
        "dist/**/*.model.js"
      ],
      synchronize: false
    },
    test:  {
      type: "postgres",
      host: "elfenroads.westus3.cloudapp.azure.com",
      port: 5432,
      username: "postgres",
      password: "jyang285",
      database: "elfenroadt",
      entities: [
        "src/**/*.model.ts"
      ],
      synchronize: true,
      dropSchema: true,
      migrationsRun: false,
      migrations: [
        "src/database/migrations/*.ts"
      ],
      cli: {
        migrationsDir: "src/database/migrations"
    },
    keepConnectionAlive: true
    }
  }

  const DatabaseConfig = () => ({
    ...database[process.env.NODE_ENV]
  })

  export = DatabaseConfig;