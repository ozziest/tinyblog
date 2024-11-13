import { IBeforeInsertContext, IoCService, RedisAdaptor } from "axe-api";
import UserService from "../../Services/UserService";
import { validate } from "robust-validator";
import HTTPService from "../../Services/HTTPService";
import { captureError } from "../../Services/ErrorService";
import { v4 as uuidv4 } from "uuid";
import { nanoid, customAlphabet } from "nanoid";

export default async ({ req, formData, res }: IBeforeInsertContext) => {
  try {
    const { csrf, cfToken } = req.body;
    const { agentId } = req.original;

    const validation = await validate(
      { csrf, agentId, cfToken },
      {
        csrf: "required|min:40",
        agentId: "required",
        cfToken: "required",
      }
    );
    if (validation.isInvalid) {
      return res.status(400).json(validation);
    }

    const redis = await IoCService.use<RedisAdaptor>("Redis");

    formData.email = formData.email.trim().toLowerCase();

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
    if (savedCSRF !== csrf) {
      return res.status(400).json({
        error: "Unacceptable request! Please check your captcha code.",
      });
    }

    // Let's check the email and username
    const user = await UserService.getUserByEmail(formData.email);

    if (user) {
      return res.status(400).json({
        error: "E-mail or username is already used.",
      });
    }

    const codeGenerator = customAlphabet("1234567890", 6);
    const code = codeGenerator();

    // Set the uuid
    formData.id = uuidv4();
    formData.agent_id = req.original.agentId;
    formData.confirmation_code = code;
  } catch (error) {
    captureError(error);
    res.status(500).json({ error: "An error occurred!" });
  }
};
