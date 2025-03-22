import {
  require_dist
} from "/build/_shared/chunk-EAERLIQE.js";
import "/build/_shared/chunk-PH7FC7E6.js";
import {
  ArrowLeft,
  Clock,
  Trophy
} from "/build/_shared/chunk-WWM5K4CA.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Link,
  useLoaderData
} from "/build/_shared/chunk-YXI754PJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-PQM23IGJ.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/campaigns.$id.tsx
var import_node = __toESM(require_node(), 1);
var import_auth_helpers_remix = __toESM(require_dist(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/campaigns.$id.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/campaigns.$id.tsx"
  );
  import.meta.hot.lastModified = "1742653852000";
}
var meta = () => {
  return [{
    title: "Campaign Details - KaitoRewards"
  }, {
    name: "description",
    content: "Learn more about this campaign and how to participate"
  }];
};
function CampaignDetail() {
  _s();
  const {
    campaign
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "min-h-screen bg-slate-950", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto max-w-6xl px-6 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-4 mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/", className: "flex items-center gap-2 text-slate-400 hover:text-white transition-colors", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "w-4 h-4" }, void 0, false, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 116,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Back to Campaigns" }, void 0, false, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 117,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 115,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 114,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-16 h-16 bg-slate-900/50 rounded-full flex items-center justify-center border-2 border-[rgb(var(--primary))]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "w-8 h-8 text-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 124,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 123,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl font-bold", children: campaign.title }, void 0, false, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 127,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-slate-400 mt-2", children: campaign.description }, void 0, false, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 128,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 126,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 122,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-2xl font-bold", children: [
        "$",
        campaign.value.toLocaleString()
      ] }, void 0, true, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 132,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 131,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:col-span-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-semibold mb-4", children: "About This Campaign" }, void 0, false, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 140,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "prose prose-invert max-w-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", { className: "whitespace-pre-wrap font-sans text-slate-300", children: campaign.longDescription }, void 0, false, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 142,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 141,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 139,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-semibold mb-4", children: "Reward Distribution" }, void 0, false, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 147,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "prose prose-invert max-w-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", { className: "whitespace-pre-wrap font-sans text-slate-300", children: campaign.distribution }, void 0, false, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 149,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 148,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 146,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 138,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:col-span-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-slate-900/50 rounded-xl p-6 sticky top-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-2 text-slate-400 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "w-5 h-5" }, void 0, false, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 158,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
            "Expires: ",
            new Date(campaign.expires_at).toLocaleDateString()
          ] }, void 0, true, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 159,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 157,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/campaigns/${campaign.id}/leaderboard`, className: "block w-full bg-[rgb(var(--primary))] text-slate-950 rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-all mb-4 text-center", children: "View Leaderboard" }, void 0, false, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 162,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 156,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 155,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 136,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/campaigns.$id.tsx",
    lineNumber: 113,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/campaigns.$id.tsx",
    lineNumber: 112,
    columnNumber: 10
  }, this);
}
_s(CampaignDetail, "ZNTthqsQDj4irjWa61oxvFiv7j4=", false, function() {
  return [useLoaderData];
});
_c = CampaignDetail;
var _c;
$RefreshReg$(_c, "CampaignDetail");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CampaignDetail as default,
  meta
};
//# sourceMappingURL=/build/routes/campaigns.$id-PXR5IHEW.js.map
