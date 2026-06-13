import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  reviews: defineTable({
    author: v.string(),
    text: v.string(),
    date: v.string(),
    timestamp: v.number(),
    isHidden: v.optional(v.boolean()),
  }),
  
  complaints: defineTable({
    name: v.string(),
    phone: v.string(),
    category: v.string(),
    brand: v.string(),
    dateOfPurchase: v.string(),
    notes: v.string(),
    status: v.string(), // "Pending", "In Progress", "Resolved"
    billStorageId: v.optional(v.id("_storage")),
    productStorageId: v.optional(v.id("_storage")), // Legacy field from before we supported multiple images
    productStorageIds: v.optional(v.array(v.id("_storage"))),
    timestamp: v.number(),
  }),

  advertisements: defineTable({
    title: v.optional(v.string()),
    imageId: v.id("_storage"),
    isActive: v.boolean(),
    timestamp: v.number(),
  }),
});
