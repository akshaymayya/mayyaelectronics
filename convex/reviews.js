import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reviews").order("desc").take(50);
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
    });
  },
});
