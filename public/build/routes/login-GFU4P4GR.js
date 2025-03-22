import {
  require_supabase
} from "/build/_shared/chunk-L6MISQIZ.js";
import {
  Lock
} from "/build/_shared/chunk-WWM5K4CA.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
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

// app/routes/login/route.tsx
var import_node = __toESM(require_node(), 1);
var import_supabase = __toESM(require_supabase(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/login/route.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/login/route.tsx"
  );
  import.meta.hot.lastModified = "1742653852000";
}
var meta = () => {
  return [{
    title: "Login - Campaign Platform"
  }, {
    name: "description",
    content: "Login to manage your campaigns"
  }];
};
function Login() {
  _s();
  const {
    error,
    message
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-[#2d2d2d] p-8 rounded-lg shadow-lg w-full max-w-md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "w-8 h-8 text-[rgb(var(--primary))]" }, void 0, false, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 98,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Login" }, void 0, false, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 99,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 97,
      columnNumber: 9
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4", children: error }, void 0, false, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 102,
      columnNumber: 19
    }, this),
    message && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded mb-4", children: message }, void 0, false, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 106,
      columnNumber: 21
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "email", className: "block text-sm font-medium mb-1", children: "Email" }, void 0, false, {
          fileName: "app/routes/login/route.tsx",
          lineNumber: 113,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "email", id: "email", name: "email", required: true, className: "w-full px-4 py-2 rounded bg-[#1d1d1d] border border-[#3d3d3d] focus:outline-none focus:border-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/login/route.tsx",
          lineNumber: 116,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 112,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password", className: "block text-sm font-medium mb-1", children: "Password" }, void 0, false, {
          fileName: "app/routes/login/route.tsx",
          lineNumber: 120,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "password", id: "password", name: "password", required: true, className: "w-full px-4 py-2 rounded bg-[#1d1d1d] border border-[#3d3d3d] focus:outline-none focus:border-[rgb(var(--primary))]" }, void 0, false, {
          fileName: "app/routes/login/route.tsx",
          lineNumber: 123,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 119,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "w-full px-4 py-2 bg-[rgb(var(--primary))] text-[#1d1d1d] rounded-lg font-medium hover:opacity-90", children: "Sign In" }, void 0, false, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 126,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-center text-sm text-gray-400", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/signup", className: "text-[rgb(var(--primary))] hover:underline", children: "Sign up" }, void 0, false, {
          fileName: "app/routes/login/route.tsx",
          lineNumber: 132,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 130,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 111,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 110,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login/route.tsx",
    lineNumber: 96,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/login/route.tsx",
    lineNumber: 95,
    columnNumber: 10
  }, this);
}
_s(Login, "LhqtLEdqO/QwyPQcUXzCYGD4GWM=", false, function() {
  return [useLoaderData];
});
_c = Login;
var _c;
$RefreshReg$(_c, "Login");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Login as default,
  meta
};
//# sourceMappingURL=/build/routes/login-GFU4P4GR.js.map
