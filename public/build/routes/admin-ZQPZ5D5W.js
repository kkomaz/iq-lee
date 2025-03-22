import {
  require_supabase
} from "/build/_shared/chunk-L6MISQIZ.js";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Trophy
} from "/build/_shared/chunk-WWM5K4CA.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit
} from "/build/_shared/chunk-YXI754PJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-PQM23IGJ.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/admin.tsx
var import_node = __toESM(require_node(), 1);
var import_supabase = __toESM(require_supabase(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/admin.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/admin.tsx"
  );
  import.meta.hot.lastModified = "1742653852000";
}
var meta = () => {
  return [{
    title: "Admin - Campaign Platform"
  }, {
    name: "description",
    content: "Manage your campaigns"
  }];
};
function CampaignForm({
  campaign = null,
  onCancel
}) {
  _s();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: campaign ? "update" : "create" }, void 0, false, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 180,
      columnNumber: 7
    }, this),
    campaign && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "id", value: campaign.id }, void 0, false, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 181,
      columnNumber: 20
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "title", className: "block text-sm font-medium mb-1", children: "Title *" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 185,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "title", name: "title", required: true, defaultValue: campaign?.title, className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 188,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 184,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "imageUrl", className: "block text-sm font-medium mb-1", children: "Image URL" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 192,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "url", id: "imageUrl", name: "imageUrl", defaultValue: campaign?.image_url, className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 195,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 191,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "description", className: "block text-sm font-medium mb-1", children: "Short Description *" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 199,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "description", name: "description", required: true, defaultValue: campaign?.description, rows: 2, className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 202,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 198,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "rewardAmount", className: "block text-sm font-medium mb-1", children: "Reward Amount *" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 206,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "rewardAmount", name: "rewardAmount", required: true, defaultValue: campaign?.reward_amount, className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 209,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 205,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "longDescription", className: "block text-sm font-medium mb-1", children: "Long Description" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 213,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "longDescription", name: "longDescription", defaultValue: campaign?.long_description, rows: 4, className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 216,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 212,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "distributionDetails", className: "block text-sm font-medium mb-1", children: "Distribution Details" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 220,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "distributionDetails", name: "distributionDetails", defaultValue: campaign?.distribution_details, rows: 4, className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 223,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 219,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "tags", className: "block text-sm font-medium mb-1", children: "Tags (comma-separated)" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 227,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "tags", name: "tags", defaultValue: campaign?.tags ? campaign.tags.join(", ") : "", className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]", placeholder: "nft, gaming, crypto" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 230,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 226,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "expiresAt", className: "block text-sm font-medium mb-1", children: "Expiry Date" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 234,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "datetime-local", id: "expiresAt", name: "expiresAt", defaultValue: campaign?.expires_at ? new Date(campaign.expires_at).toISOString().slice(0, 16) : "", className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 237,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 233,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "isFeatured", defaultChecked: campaign?.is_featured, className: "w-4 h-4 rounded bg-slate-800 border-slate-700 text-[rgb(var(--primary))]" }, void 0, false, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 242,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: "Featured" }, void 0, false, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 243,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 241,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "isNew", defaultChecked: campaign?.is_new ?? true, className: "w-4 h-4 rounded bg-slate-800 border-slate-700 text-[rgb(var(--primary))]" }, void 0, false, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 247,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: "New" }, void 0, false, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 248,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 246,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "isSponsored", defaultChecked: campaign?.is_sponsored, className: "w-4 h-4 rounded bg-slate-800 border-slate-700 text-[rgb(var(--primary))]" }, void 0, false, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 252,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: "Sponsored" }, void 0, false, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 253,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 251,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 183,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-4", children: [
      onCancel && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: onCancel, className: "px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700", children: "Cancel" }, void 0, false, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 259,
        columnNumber: 22
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isSubmitting, className: "flex items-center gap-2 px-6 py-2 bg-[rgb(var(--primary))] text-slate-950 rounded-lg font-medium hover:opacity-90 disabled:opacity-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "w-4 h-4" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 263,
          columnNumber: 11
        }, this),
        isSubmitting ? campaign ? "Updating..." : "Creating..." : campaign ? "Update Campaign" : "Create Campaign"
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 262,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 258,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 179,
    columnNumber: 10
  }, this);
}
_s(CampaignForm, "I2WaJhUM5KV32aS1+j3KKeVsgyA=", false, function() {
  return [useNavigation];
});
_c = CampaignForm;
function Admin() {
  _s2();
  const {
    campaigns
  } = useLoaderData();
  const [editingCampaign, setEditingCampaign] = (0, import_react2.useState)(null);
  const [showCreateForm, setShowCreateForm] = (0, import_react2.useState)(false);
  const submit = useSubmit();
  const handleDelete = (campaign) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      const formData = new FormData();
      formData.append("intent", "delete");
      formData.append("id", campaign.id);
      submit(formData, {
        method: "post"
      });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "min-h-screen bg-slate-950", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "bg-slate-900 border-b border-slate-800 p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto flex justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "w-6 h-6 text-[rgb(var(--primary))]" }, void 0, false, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 295,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xl font-bold", children: "Admin Dashboard" }, void 0, false, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 296,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 294,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 293,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 292,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container mx-auto px-4 py-8", children: [
      editingCampaign ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-bold", children: "Edit Campaign" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 304,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 303,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CampaignForm, { campaign: editingCampaign, onCancel: () => setEditingCampaign(null) }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 307,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 306,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 302,
        columnNumber: 28
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowCreateForm(!showCreateForm), className: "flex items-center gap-2 text-2xl font-bold mb-6", children: [
          "Create New Campaign",
          showCreateForm ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "w-6 h-6" }, void 0, false, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 312,
            columnNumber: 33
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "w-6 h-6" }, void 0, false, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 312,
            columnNumber: 69
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 310,
          columnNumber: 13
        }, this),
        showCreateForm && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CampaignForm, {}, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 315,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 314,
          columnNumber: 32
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 309,
        columnNumber: 20
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-bold mb-6", children: "Your Campaigns" }, void 0, false, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 320,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-6", children: [
          campaigns?.map((campaign) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-bold", children: campaign.title }, void 0, false, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 326,
                  columnNumber: 23
                }, this),
                campaign.is_featured && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]", children: "Featured" }, void 0, false, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 327,
                  columnNumber: 48
                }, this),
                campaign.is_new && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-500", children: "New" }, void 0, false, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 330,
                  columnNumber: 43
                }, this),
                campaign.is_sponsored && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-500", children: "Sponsored" }, void 0, false, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 333,
                  columnNumber: 49
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 325,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-slate-400 mb-4", children: campaign.description }, void 0, false, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 337,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-4 text-sm text-slate-500", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
                  "Reward: $",
                  campaign.reward_amount
                ] }, void 0, true, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 339,
                  columnNumber: 23
                }, this),
                campaign.expires_at && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "\u2022" }, void 0, false, {
                    fileName: "app/routes/admin.tsx",
                    lineNumber: 341,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
                    "Expires: ",
                    new Date(campaign.expires_at).toLocaleDateString()
                  ] }, void 0, true, {
                    fileName: "app/routes/admin.tsx",
                    lineNumber: 342,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 340,
                  columnNumber: 47
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 338,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 324,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setEditingCampaign(campaign), className: "px-3 py-1 bg-slate-800 text-white rounded hover:bg-slate-700", children: "Edit" }, void 0, false, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 347,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleDelete(campaign), className: "px-3 py-1 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20", children: "Delete" }, void 0, false, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 350,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 346,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 323,
            columnNumber: 17
          }, this) }, campaign.id, false, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 322,
            columnNumber: 41
          }, this)),
          campaigns?.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6 flex items-center justify-center gap-3 text-slate-400", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertCircle, { className: "w-5 h-5" }, void 0, false, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 358,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "No campaigns found. Create your first campaign above!" }, void 0, false, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 359,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 357,
            columnNumber: 41
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 321,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 319,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 301,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 291,
    columnNumber: 10
  }, this);
}
_s2(Admin, "w2t4Kg/HOWRH2hzuQphJn5r/7KE=", false, function() {
  return [useLoaderData, useSubmit];
});
_c2 = Admin;
var _c;
var _c2;
$RefreshReg$(_c, "CampaignForm");
$RefreshReg$(_c2, "Admin");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Admin as default,
  meta
};
//# sourceMappingURL=/build/routes/admin-ZQPZ5D5W.js.map
