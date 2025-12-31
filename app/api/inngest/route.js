import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { deleteUser, saveUserCreation, saveUserUpdate } from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    saveUserCreation,
    saveUserUpdate,
    deleteUser
  ],
});