import { supabase } from "./supabaseClient";

const EDGE_FUNCTION_URL = import.meta.env.VITE_EDGE_FUNCTION_URL;

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
  sendSMS: async ({ to, body }) => {
    if (!to || !body) throw new Error("Missing 'to' or 'body'");

    const res = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, body }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.error || "Failed to send SMS");
    return data;
  },
};
