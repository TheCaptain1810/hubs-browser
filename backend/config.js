import { Scopes } from "@aps_sdk/authentication";
import dotenv from "dotenv";

dotenv.config();

const APS_CLIENT_ID = process.env.APS_CLIENT_ID;
const APS_CLIENT_SECRET = process.env.APS_CLIENT_SECRET;
const APS_CALLBACK_URL = process.env.APS_CALLBACK_URL;
const SERVER_SESSION_SECRET = process.env.SERVER_SESSION_SECRET;
const PORT = process.env.PORT || 8080;

const INTERNAL_TOKEN_SCOPES = [Scopes.DataRead, Scopes.ViewablesRead];
const PUBLIC_TOKEN_SCOPES = [Scopes.ViewablesRead];

export {
  APS_CLIENT_ID,
  APS_CLIENT_SECRET,
  APS_CALLBACK_URL,
  SERVER_SESSION_SECRET,
  INTERNAL_TOKEN_SCOPES,
  PUBLIC_TOKEN_SCOPES,
  PORT,
};
