import {
  Trophy
} from "/build/_shared/chunk-2QBUDEHY.js";
import {
  createHotContext
} from "/build/_shared/chunk-PQM23IGJ.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/admin.tsx
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
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/admin.tsx"
  );
  import.meta.hot.lastModified = "1742662413353.693";
}
var meta = () => {
  return [{
    title: "Admin - Campaign Platform"
  }, {
    name: "description",
    content: "Manage your campaigns"
  }];
};
function Admin() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "min-h-screen bg-slate-950", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "bg-slate-900 border-b border-slate-800 p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto flex justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "w-6 h-6 text-[rgb(var(--primary))]" }, void 0, false, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 35,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-xl font-bold", children: "Admin Dashboard" }, void 0, false, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 36,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 34,
    columnNumber: 11
  }, this) }, void 0, false, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 33,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 32,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 31,
    columnNumber: 10
  }, this);
}
_c = Admin;
var _c;
$RefreshReg$(_c, "Admin");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Admin as default,
  meta
};
//# sourceMappingURL=/build/routes/admin-AJ3YBUQB.js.map
