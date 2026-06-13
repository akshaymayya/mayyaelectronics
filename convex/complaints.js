import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate a URL for the frontend to upload a file to
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Submit a new complaint
export const submit = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    category: v.string(),
    brand: v.string(),
    dateOfPurchase: v.string(),
    notes: v.string(),
    billStorageId: v.optional(v.id("_storage")),
    productStorageIds: v.optional(v.array(v.id("_storage"))),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("complaints", {
      ...args,
      status: "Pending",
      timestamp: Date.now(),
    });
  },
});

// Get all complaints for the admin dashboard
export const get = query({
  args: {},
  handler: async (ctx) => {
    const complaints = await ctx.db.query("complaints").order("desc").collect();
    
    // We need to resolve the storage IDs into actual readable URLs
    return await Promise.all(
      complaints.map(async (complaint) => {
        let billUrl = null;
        let productUrls = [];
        
        if (complaint.billStorageId) {
          billUrl = await ctx.storage.getUrl(complaint.billStorageId);
        }
        if (complaint.productStorageIds && complaint.productStorageIds.length > 0) {
          productUrls = await Promise.all(
            complaint.productStorageIds.map(id => ctx.storage.getUrl(id))
          );
        }
        
        return {
          ...complaint,
          billUrl,
          productUrls,
        };
      })
    );
  },
});

// Update complaint status
export const updateStatus = mutation({
  args: {
    id: v.id("complaints"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });
  },
});
