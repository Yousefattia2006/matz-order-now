import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const offset = parseInt(url.searchParams.get("offset") || "0");
  const limit = parseInt(url.searchParams.get("limit") || "20");
  const table = url.searchParams.get("table") || "products";

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  const results: string[] = [];

  const { data: rows, error } = await supabase
    .from(table)
    .select("id, image_url")
    .like("image_url", "data:%")
    .range(offset, offset + limit - 1);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  results.push(`Processing ${rows.length} rows from ${table} (offset=${offset})`);

  let success = 0, failed = 0;

  for (const row of rows) {
    try {
      const match = row.image_url.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) { failed++; continue; }

      const mimeType = match[1];
      const base64Data = match[2];
      const ext = mimeType.includes("png") ? "png" : "jpg";
      const prefix = table === "special_offers" ? "offers/" : "";
      const fileName = `${prefix}${row.id}.${ext}`;

      const binaryStr = atob(base64Data);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, bytes, { contentType: mimeType, upsert: true });

      if (uploadError) { results.push(`Upload fail ${row.id}: ${uploadError.message}`); failed++; continue; }

      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from(table)
        .update({ image_url: urlData.publicUrl })
        .eq("id", row.id);

      if (updateError) { failed++; continue; }
      success++;
    } catch (e) {
      results.push(`Error ${row.id}: ${e.message}`);
      failed++;
    }
  }

  results.push(`Done: ${success} ok, ${failed} failed. Remaining: ${rows.length === limit}`);

  return new Response(JSON.stringify({ results, processed: rows.length, hasMore: rows.length === limit }), {
    headers: { "Content-Type": "application/json" },
  });
});
