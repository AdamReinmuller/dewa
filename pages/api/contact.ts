import nodemailer from "nodemailer";

export default async (req: any, res: any) => {
  const { subject, email, message, telephone } = req.body;
  const transporter = nodemailer.createTransport({
    host: "mail.dewa.hu",
    port: 465,
    secure: true,
    auth: {
      user: "b.patrick@dewa.hu",
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "dewa@dewa.hu",
      to: "rajfta@gmail.com",
      subject: `Honlapon érdeklődés targy: ${subject} | feladó: ${email} | telefon: ${telephone}`,
      html: `<p>Honlapról érkező üzenet</p><br>
      <p>${message}</p><br>

      `,
    });

    // eslint-disable-next-line no-console
    console.log("Message Sent");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(200).json(req.body);
};
