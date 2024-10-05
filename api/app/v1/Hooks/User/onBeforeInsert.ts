import { IBeforeInsertContext, IoCService, RedisAdaptor } from "axe-api";
import bcrypt from "bcrypt";
import UserService from "../../Services/UserService";
import { validate } from "robust-validator";

export default async ({
  req,
  formData,
  database,
  res,
}: IBeforeInsertContext) => {
  const redis = await IoCService.use<RedisAdaptor>("Redis");
  if (redis.isReady() === false) {
    await redis.connect();
  }

  formData.email = formData.email.trim().toLowerCase();
  formData.username = formData.username.trim().toLowerCase();

  const { csrf, captcha } = req.body;
  const { agentId } = req.original;

  const validation = await validate(
    { csrf, captcha, agentId },
    {
      csrf: "required|min:40",
      captcha: "required|min:8",
      agentId: "required",
    }
  );

  if (validation.isInvalid) {
    return res.status(400).json(validation);
  }

  const savedCSRF = await redis.get(`LastCSRF:${agentId}`);
  const savedCaptcha = await redis.get(`LastCaptchaCode:${agentId}`);

  if (savedCSRF !== csrf || savedCaptcha !== captcha) {
    return res.status(400).json({
      error: "Unacceptable request! Please check your captcha code.",
    });
  }

  const user = await UserService.getUserByEmailOrUsername(
    formData.email,
    formData.username
  );

  if (user) {
    return res.status(400).json({
      error: "E-mail or username is already used.",
    });
  }

  formData.password = bcrypt.hashSync(formData.password, 10);
};
