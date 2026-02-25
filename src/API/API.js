import { supabase } from "./supabaseClient";

export const API = {
  getAll: async () => {
    return await supabase
      .from("apartments")
      .select("*")
      .order("position", { ascending: true });
  },
  getAddress: async (id) => {
    if (!id) throw new Error("ID missed");
    return supabase.from("apartments").select("*").eq("id", id).single();
  },
  create: async (body) => {
    if (!body) throw new Error("body missed");
    return supabase.from("apartments").insert([body]);
  },
  update: async ({ id, body }) => {
    if (!id || !body) throw new Error("ID or body missed");
    const { id: _omit, ...clearBody } = body;
    return supabase.from("apartments").update(clearBody).eq("id", id);
  },
  delete: async (id) => {
    if (!id) throw new Error("ID missed");
    return supabase.from("apartments").delete().eq("id", id);
  },
  sendSMS: async ({ body }) => {
    if (!body) throw new Error("Missing 'body'");

    const { data, error } = await supabase.functions.invoke("sendSMS", {
      method: "POST",
      body: { body },
    });

    if (error) throw new Error(error.message || "Failed to send SMS");
    return data;
  },
};
