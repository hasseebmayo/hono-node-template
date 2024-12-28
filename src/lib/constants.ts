/**
 * Default email addresses for the application.
 */
export const DEFAULT_FROM_EMAIL = {
  no_reply: "no-reply@themuslimticket.com",
  info: "info@themuslimticket.com",
} as const;
export type IDefaultEmail = keyof typeof DEFAULT_FROM_EMAIL;
export const COMPANY_NAME = "Muslim Ticket";
