import { IBeforeInsertContext, IoCService, RedisAdaptor } from "axe-api";
import bcrypt from "bcrypt";
import UserService from "../../Services/UserService";
import { validate } from "robust-validator";
import HTTPService from "../../Services/HTTPService";

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

  const { csrf, captcha, cfToken } = req.body;
  const { agentId } = req.original;

  const validation = await validate(
    { csrf, captcha, agentId, cfToken },
    {
      csrf: "required|min:40",
      captcha: "required|min:8",
      agentId: "required",
      cfToken: "required",
    }
  );

  if (validation.isInvalid) {
    return res.status(400).json(validation);
  }

  // Let's verify the user with CF
  const isVerifiedByCF = await HTTPService.verifyCFToken(
    cfToken,
    HTTPService.getIpAddress(req.original)
  );
  if (!isVerifiedByCF) {
    return res.status(400).json({
      error:
        "We couldn't be sure your are a real user. Please try again later.",
    });
  }

  // Let's check the CSRF and captcha
  const savedCSRF = await redis.get(`LastCSRF:${agentId}`);
  const savedCaptcha = await redis.get(`LastCaptchaCode:${agentId}`);
  if (savedCSRF !== csrf || savedCaptcha !== captcha) {
    return res.status(400).json({
      error: "Unacceptable request! Please check your captcha code.",
    });
  }

  // Let's check the email and username
  const user = await UserService.getUserByEmailOrUsername(
    formData.email,
    formData.username
  );

  if (user) {
    return res.status(400).json({
      error: "E-mail or username is already used.",
    });
  }

  // Everything is looks fine. Let's hash the password
  formData.password = bcrypt.hashSync(formData.password, 10);
};
