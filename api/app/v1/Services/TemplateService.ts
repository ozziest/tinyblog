import { LogService } from "axe-api/build/src/Services";
import fs from "fs";
import path from "path";
import { cwd } from "process";
import { EmailTemplates } from "../../enums";

const ROOT = path.join(cwd(), "app", "v1", "Templates");

const loadFile = (file: string) => {
  return fs.readFileSync(path.join(ROOT, file), "utf-8");
};

const TEMPLATES: Record<EmailTemplates, string> = {
  [EmailTemplates.EmailConfirmation]: loadFile("EmailConfirmation.html"),
  [EmailTemplates.Welcome]: loadFile("Welcome.html"),
  [EmailTemplates.PasswordReset]: loadFile("PasswordReset.html"),
  [EmailTemplates.AccountDeactivated]: loadFile("AccountDeactivated.html"),
};

export const prepareTemplates = () => {
  LogService.info("Templates are ready!");
};

export const getTemplate = (template: EmailTemplates): string => {
  return TEMPLATES[template];
};
