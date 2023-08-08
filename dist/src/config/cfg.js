import "dotenv/config";
const { env } = process;
export default {
    port: env.PORT || 3000,
    connection_string: env.CONNECTION_STRING,
    secret_key: env.SECRET_KEY,
    email: env.EMAIL,
    pass: env.PASS,
    admin_username: env.ADMIN_USERNAME,
    admin_password: env.ADMIN_PASSWORD,
    admin_email: env.ADMIN_EMAIL,
    payment_key: env.PAYMENT_KEY,
};
