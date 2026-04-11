import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  const results: string[] = [];

  // Migrate products
  const { data: products, error } = await supabase
    .from("products")
    .select("id, image_url")
    .like("image_url", "data:%");

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  results.push(`Found ${products.length} products with base64 images`);

  let success = 0;
  let failed = 0;

  for (const p of products) {
    try {
      const match = p.image_url.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) { failed++; continue; }

      const mimeType = match[1];
      const base64Data = match[2];
      const ext = mimeType.includes("png") ? "png" : "jpg";
      const fileName = `${p.id}.${ext}`;

      // Decode base64
      const binaryStr = atob(base64Data);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, bytes, { contentType: mimeType, upsert: true });

      if (uploadError) { results.push(`Upload fail ${p.id}: ${uploadError.message}`); failed++; continue; }

      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("products")
        .update({ image_url: urlData.publicUrl })
        .eq("id", p.id);

      if (updateError) { failed++; continue; }
      success++;
    } catch (e) {
      results.push(`Error ${p.id}: ${e.message}`);
      failed++;
    }
  }

  results.push(`Products done: ${success} ok, ${failed} failed`);

  // Migrate special_offers
  const { data: offers } = await supabase
    .from("special_offers")
    .select("id, image_url")
    .like("image_url", "data:%");

  if (offers && offers.length > 0) {
    for (const o of offers) {
      try {
        const match = o.image_url.match(/^data:([^;]+);base64,(.+)$/);
        if (!match) continue;
        const mimeType = match[1];
        const base64Data = match[2];
        const ext = mimeType.includes("png") ? "png" : "jpg";
        const fileName = `offers/${o.id}.${ext}`;
        const binaryStr = atob(base64Data);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

        await supabase.storage.from("product-images").upload(fileName, bytes, { contentType: mimeType, upsert: true });
        const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
        await supabase.from("special_offers").update({ image_url: urlData.publicUrl }).eq("id", o.id);
        results.push(`Offer ${o.id} migrated`);
      } catch (e) {
        results.push(`Offer error: ${e.message}`);
      }
    }
  }

  return new Response(JSON.stringify({ results }), {
    headers: { "Content-Type": "application/json" },
  });
});
