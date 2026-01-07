import { supabase } from "./supabaseClient";

export const API = {
  getAll: async () => {
    return await supabase
      .from("apartments")
      .select("*")
      .order("id", { ascending: true });
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
};
