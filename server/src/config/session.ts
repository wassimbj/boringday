import session from "express-session";
import mysqlStore from "express-mysql-session";

export default function sessionConfig() {
  const SessionStore = mysqlStore(session as any);
  const dbUrl = new URL(process.env.DATABASE_URL!);
  return session({
    name: "ssid",
    secret: process.env.SESSION_KEY as unknown as string, // Put whatever here
    resave: true,
    store: new SessionStore({
      database: dbUrl.pathname.substring(1, dbUrl.pathname.length),
      host: dbUrl.hostname,
      port: Number.parseInt(dbUrl.port),
      user: dbUrl.username,
      password: dbUrl.password,
    }),
    saveUninitialized: true,
    unset: "destroy",
    cookie: {
      maxAge: 864000000, // 10 days in ms
    },
  });
}
