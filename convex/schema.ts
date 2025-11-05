import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  forms: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    components: v.array(v.any()), // FormComponentModel data
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    userId: v.optional(v.string()), // For user-specific forms
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_created_at", ["createdAt"])
    .index("by_category", ["category"]),
  userThemes: defineTable({
    userId: v.string(),
    name: v.string(),
    css: v.string(),
    isDefault: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_default", ["userId", "isDefault"]),
});
