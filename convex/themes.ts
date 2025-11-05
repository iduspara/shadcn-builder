import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveTheme = mutation({
  args: {
    id: v.optional(v.id("userThemes")),
    userId: v.string(),
    name: v.string(),
    css: v.string(),
    isDefault: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // If setting as default, unset other defaults for this user
    if (args.isDefault) {
      const existingDefaults = await ctx.db
        .query("userThemes")
        .withIndex("by_user_default", (q) =>
          q.eq("userId", args.userId).eq("isDefault", true)
        )
        .collect();

      for (const theme of existingDefaults) {
        await ctx.db.patch(theme._id, { isDefault: false });
      }
    }

    if (args.id) {
      // Update existing theme
      await ctx.db.patch(args.id, {
        name: args.name,
        css: args.css,
        isDefault: args.isDefault ?? false,
        updatedAt: now,
      });
      return args.id;
    } else {
      // Create new theme
      const themeId = await ctx.db.insert("userThemes", {
        userId: args.userId,
        name: args.name,
        css: args.css,
        isDefault: args.isDefault ?? false,
        createdAt: now,
        updatedAt: now,
      });
      return themeId;
    }
  },
});

export const deleteTheme = mutation({
  args: { id: v.id("userThemes") },
  handler: async (ctx, args) => {
    // Get the theme before deleting to check if it's the default
    const theme = await ctx.db.get(args.id);
    if (!theme) {
      throw new Error("Theme not found");
    }
    
    // Delete the theme - if it was the default, it will no longer be the default
    // since the record no longer exists
    await ctx.db.delete(args.id);
  },
});

export const setDefaultTheme = mutation({
  args: {
    id: v.id("userThemes"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Unset other defaults for this user
    const existingDefaults = await ctx.db
      .query("userThemes")
      .withIndex("by_user_default", (q) =>
        q.eq("userId", args.userId).eq("isDefault", true)
      )
      .collect();

    for (const theme of existingDefaults) {
      await ctx.db.patch(theme._id, { isDefault: false });
    }

    // Set this theme as default
    await ctx.db.patch(args.id, { isDefault: true, updatedAt: Date.now() });
  },
});

export const unsetDefaultTheme = mutation({
  args: {
    id: v.id("userThemes"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify the theme belongs to the user
    const theme = await ctx.db.get(args.id);
    if (!theme || theme.userId !== args.userId) {
      throw new Error("Theme not found or access denied");
    }

    // Unset this theme as default
    if (theme.isDefault) {
      await ctx.db.patch(args.id, { isDefault: false, updatedAt: Date.now() });
    }
  },
});

export const getUserThemes = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userThemes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getDefaultTheme = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const defaultTheme = await ctx.db
      .query("userThemes")
      .withIndex("by_user_default", (q) =>
        q.eq("userId", args.userId).eq("isDefault", true)
      )
      .first();

    return defaultTheme;
  },
});

