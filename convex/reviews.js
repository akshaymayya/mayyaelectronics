import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reviews")
      .filter((q) => q.neq(q.field("isHidden"), true))
      .order("desc")
      .take(50);
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reviews").order("desc").take(100);
  },
});

export const add = mutation({
  args: {
    author: v.string(),
    text: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("reviews", {
      author: args.author,
      text: args.text,
      date: args.date,
      timestamp: Date.now(),
      isHidden: false,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("reviews") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleVisibility = mutation({
  args: { id: v.id("reviews"), isHidden: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isHidden: args.isHidden });
  },
});
