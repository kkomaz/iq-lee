import {
  require_supabase
} from "/build/_shared/chunk-L6MISQIZ.js";
import {
  Copy,
  Link,
  Trophy
} from "/build/_shared/chunk-WWM5K4CA.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
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

// app/routes/referrals.tsx
var import_node = __toESM(require_node(), 1);
var import_supabase = __toESM(require_supabase(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/referrals.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/referrals.tsx"
  );
  import.meta.hot.lastModified = "1742653852000";
}
var meta = () => {
  return [{
    title: "My Referrals - Rewards Platform"
  }, {
    name: "description",
    content: "Manage your referral codes"
  }];
};
function Referrals() {
  _s();
  const {
    referralCodes
  } = useLoaderData();
  const copyToClipboard = (code) => {
    const url = `${window.location.origin}/signup?ref=${code}`;
    navigator.clipboard.writeText(url);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "bg-[#2d2d2d] p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto flex justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "w-6 h-6 text-[rgb(var(--primary))]" }, void 0, false, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 119,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xl font-bold", children: "My Referrals" }, void 0, false, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 120,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/referrals.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/referrals.tsx",
      lineNumber: 117,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/referrals.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Referral Codes" }, void 0, false, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 127,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "flex items-center gap-2 px-4 py-2 bg-[rgb(var(--primary))] text-[#1d1d1d] rounded-lg font-medium hover:opacity-90", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "w-4 h-4" }, void 0, false, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 130,
            columnNumber: 15
          }, this),
          "Generate New Code"
        ] }, void 0, true, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 129,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 128,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 126,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-6", children: referralCodes?.map((referral) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-bold font-mono", children: referral.code }, void 0, false, {
              fileName: "app/routes/referrals.tsx",
              lineNumber: 141,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => copyToClipboard(referral.code), className: "p-1 hover:bg-[#3d3d3d] rounded transition-colors", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "w-4 h-4" }, void 0, false, {
              fileName: "app/routes/referrals.tsx",
              lineNumber: 143,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/referrals.tsx",
              lineNumber: 142,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 140,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-400", children: [
            "Uses: ",
            referral.uses,
            referral.max_uses ? `/${referral.max_uses}` : "",
            " \xB7 Created: ",
            new Date(referral.created_at).toLocaleDateString(),
            referral.expires_at && ` \xB7 Expires: ${new Date(referral.expires_at).toLocaleDateString()}`
          ] }, void 0, true, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 146,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 139,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 138,
          columnNumber: 15
        }, this),
        referral.referral_uses.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4 pt-4 border-t border-[#3d3d3d]", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-sm font-medium text-gray-400 mb-2", children: "Recent Signups" }, void 0, false, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 154,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: referral.referral_uses.map((use) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm", children: new Date(use.created_at).toLocaleDateString() }, use.id, false, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 156,
            columnNumber: 56
          }, this)) }, void 0, false, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 155,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 153,
          columnNumber: 53
        }, this)
      ] }, referral.id, true, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 137,
        columnNumber: 43
      }, this)) }, void 0, false, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/referrals.tsx",
      lineNumber: 125,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/referrals.tsx",
    lineNumber: 115,
    columnNumber: 10
  }, this);
}
_s(Referrals, "ZwjKiB7fJq3al3qk/wX5/ntZlFA=", false, function() {
  return [useLoaderData];
});
_c = Referrals;
var _c;
$RefreshReg$(_c, "Referrals");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Referrals as default,
  meta
};
//# sourceMappingURL=/build/routes/referrals-GJIBCBVR.js.map
