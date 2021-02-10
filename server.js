const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const e = require("express");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // бібліотека страйпа бере наш сікрет ключ і надає нам доступ до своїх методів

const app = express(); // Запускаємо нову програму з Експресом
const port = 5000; // Знаходитися сервер буде за адресою, яка вказана у значенні PORT, або локалхост:5000

app.use(bodyParser.json()); // всі запити які будуть приходити на сервер, ми будемо конвертувати в json
app.use(bodyParser.urlencoded({ extended: true })); // всі урл строки конвертуються в зрозумілі серверу

app.use(cors()); // дозволяє запити між різними серверами чи в нашому випадку ПОРТАМИ

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build"))); // буде обслуговувати всі статичні файли за вказаним шляхом, де __dirname - це там де знаходиться сервер, а client/build де знаходяться файли фронта

  // get запит за будь-яким шляхом (бо в нас зірочка)
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });

  app.listen(port, (error) => {
    if (error) throw error;
    console.log("Server running on port " + port);
  });
}

// ми створюємо новий маршрут для POST запиту
// передаємо туди імя маршруту
// другим аргументом функцію із запитом і відповіддю
// для запита створюємо обєкт
// source приймає тіло запиту з токеном і айдішкою
// емаунт приймає тіло з сумою
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  // це метод страйпа, який створює платіж
  // він приймає в себе створений нами обєкт боді і вертає колбек функцію
  // в цій функції є помилка і є відповідь
  // на основі того, що нам вертає страйп, ми висилаємо в респонсі
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
