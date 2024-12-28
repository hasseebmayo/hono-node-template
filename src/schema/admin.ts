import { z } from "@hono/zod-openapi";

export const upload_gallery_image_schema = z.object({
  file: z
    .any()
    .refine(
      (file) => {
        if (Array.isArray(file)) {
          // Validate each item in the array
          return file.every(
            (f) => f && typeof f === "object" && f.type.startsWith("image/")
          );
        }
        // Validate single file
        return file && typeof file === "object" && file.type.startsWith("image/");
      },
      { message: "Only image files or an array of image files are allowed" }
    )
    .openapi({ type: "string", format: "binary" })
});
