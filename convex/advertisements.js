import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getActive = query({
  args: {},
  handler: async (ctx) => {
    const ads = await ctx.db
      .query("advertisements")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();

    return Promise.all(
      ads.map(async (ad) => {
        return {
          ...ad,
          imageUrl: await ctx.storage.getUrl(ad.imageId),
        };
      })
    );
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const ads = await ctx.db
      .query("advertisements")
      .order("desc")
      .collect();

    return Promise.all(
      ads.map(async (ad) => {
        return {
          ...ad,
          imageUrl: await ctx.storage.getUrl(ad.imageId),
        };
      })
    );
  },
});

export const add = mutation({
  args: {
    title: v.optional(v.string()),
    imageId: v.id("_storage"),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("advertisements", {
      title: args.title,
      imageId: args.imageId,
      isActive: args.isActive,
      timestamp: Date.now(),
    });
  },
});

export const toggleActive = mutation({
  args: { id: v.id("advertisements"), isActive: v.boolean() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { isActive: args.isActive });
  },
});

export const remove = mutation({
  args: { id: v.id("advertisements"), imageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.imageId);
    return await ctx.db.delete(args.id);
  },
});
