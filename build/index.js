var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 66,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 116,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader
});
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-MF7H43MK.css";

// app/root.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default }
];
async function loader({ request }) {
  let env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
  }, response = new Response(), supabase = createServerClient(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    { request, response }
  ), {
    data: { session }
  } = await supabase.auth.getSession();
  return json(
    {
      env,
      session
    },
    {
      headers: response.headers
    }
  );
}
function App() {
  let { env } = useLoaderData();
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { className: "bg-slate-950 text-white", children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, this);
}

// app/routes/campaigns.$id.tsx
var campaigns_id_exports = {};
__export(campaigns_id_exports, {
  default: () => CampaignDetail,
  loader: () => loader2,
  meta: () => meta
});
import { json as json2 } from "@remix-run/node";
import { Link as Link2, useLoaderData as useLoaderData2 } from "@remix-run/react";
import { createServerClient as createServerClient2 } from "@supabase/auth-helpers-remix";

// node_modules/lucide-react/dist/esm/createLucideIcon.js
import { forwardRef, createElement } from "react";

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim(), createLucideIcon = (iconName, iconNode) => {
  let Component = forwardRef(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      ...rest
    }, ref) => createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: ["lucide", `lucide-${toKebabCase(iconName)}`, className].join(" "),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );
  return Component.displayName = `${iconName}`, Component;
};

// node_modules/lucide-react/dist/esm/icons/alert-circle.js
var AlertCircle = createLucideIcon("AlertCircle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);

// node_modules/lucide-react/dist/esm/icons/arrow-left.js
var ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);

// node_modules/lucide-react/dist/esm/icons/chevron-down.js
var ChevronDown = createLucideIcon("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);

// node_modules/lucide-react/dist/esm/icons/chevron-up.js
var ChevronUp = createLucideIcon("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);

// node_modules/lucide-react/dist/esm/icons/clock.js
var Clock = createLucideIcon("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);

// node_modules/lucide-react/dist/esm/icons/copy.js
var Copy = createLucideIcon("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);

// node_modules/lucide-react/dist/esm/icons/link.js
var Link = createLucideIcon("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);

// node_modules/lucide-react/dist/esm/icons/lock.js
var Lock = createLucideIcon("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);

// node_modules/lucide-react/dist/esm/icons/plus.js
var Plus = createLucideIcon("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);

// node_modules/lucide-react/dist/esm/icons/trophy.js
var Trophy = createLucideIcon("Trophy", [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
]);

// node_modules/lucide-react/dist/esm/icons/user-plus.js
var UserPlus = createLucideIcon("UserPlus", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
]);

// app/routes/campaigns.$id.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Campaign Details - KaitoRewards" },
  { name: "description", content: "Learn more about this campaign and how to participate" }
];
async function loader2({ request, params }) {
  let response = new Response(), supabase = createServerClient2(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { request, response }
  ), campaign = {
    rewards: [
      {
        id: "1",
        title: "Early Access NFT Drop",
        description: "Get exclusive early access to our upcoming NFT collection",
        longDescription: "Full details about the NFT drop...",
        distribution: "Distribution details...",
        expires_at: "2025-04-01",
        value: 500,
        featured: !1
      },
      {
        id: "2",
        title: "Community Moderator Role",
        description: "Become a moderator in our growing community",
        longDescription: "Full details about the moderator role...",
        distribution: "Distribution details...",
        expires_at: "2025-03-28",
        value: 300,
        featured: !1
      },
      {
        id: "3",
        title: "Premium Membership",
        description: "1-year premium membership with exclusive benefits",
        longDescription: `Join our exclusive premium membership program and unlock a world of benefits. As a premium member, you'll get:

    \u2022 Early access to new features
    \u2022 Exclusive discord channels
    \u2022 Monthly virtual events
    \u2022 Priority support
    \u2022 Special merchandise discounts`,
        distribution: `Rewards will be distributed in the following manner:

    1. All qualified participants will receive an email with redemption instructions
    2. Premium membership activation codes will be sent within 24 hours of qualification
    3. Discord role access will be granted automatically
    4. Merchandise discount codes will be distributed monthly`,
        expires_at: "2025-03-25",
        value: 1e3,
        featured: !0
      },
      {
        id: "4",
        title: "Limited Edition Merch",
        description: "Exclusive merchandise only for reward holders",
        longDescription: "Full details about the merchandise...",
        distribution: "Distribution details...",
        expires_at: "2025-04-15",
        value: 150,
        featured: !0
      }
    ]
  }.rewards.find((reward) => reward.id === params.id);
  if (!campaign)
    throw new Response("Not Found", { status: 404 });
  return json2(
    { campaign },
    { headers: response.headers }
  );
}
function CampaignDetail() {
  let { campaign } = useLoaderData2();
  return /* @__PURE__ */ jsxDEV3("div", { className: "min-h-screen bg-slate-950", children: /* @__PURE__ */ jsxDEV3("div", { className: "mx-auto max-w-6xl px-6 py-8", children: [
    /* @__PURE__ */ jsxDEV3("div", { className: "flex items-center gap-4 mb-8", children: /* @__PURE__ */ jsxDEV3(
      Link2,
      {
        to: "/",
        className: "flex items-center gap-2 text-slate-400 hover:text-white transition-colors",
        children: [
          /* @__PURE__ */ jsxDEV3(ArrowLeft, { className: "w-4 h-4" }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 101,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV3("span", { children: "Back to Campaigns" }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 102,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 97,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 96,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV3("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxDEV3("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxDEV3("div", { className: "w-16 h-16 bg-slate-900/50 rounded-full flex items-center justify-center border-2 border-[rgb(var(--primary))]", children: /* @__PURE__ */ jsxDEV3(Trophy, { className: "w-8 h-8 text-[rgb(var(--primary))]" }, void 0, !1, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 109,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 108,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { children: [
          /* @__PURE__ */ jsxDEV3("h1", { className: "text-4xl font-bold", children: campaign.title }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 112,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { className: "text-slate-400 mt-2", children: campaign.description }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 113,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 111,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 107,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { className: "bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2", children: /* @__PURE__ */ jsxDEV3("span", { className: "text-2xl font-bold", children: [
        "$",
        campaign.value.toLocaleString()
      ] }, void 0, !0, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 117,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 116,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 106,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV3("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxDEV3("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxDEV3("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxDEV3("section", { children: [
          /* @__PURE__ */ jsxDEV3("h2", { className: "text-2xl font-semibold mb-4", children: "About This Campaign" }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 125,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("div", { className: "prose prose-invert max-w-none", children: /* @__PURE__ */ jsxDEV3("pre", { className: "whitespace-pre-wrap font-sans text-slate-300", children: campaign.longDescription }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 127,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 126,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 124,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV3("section", { children: [
          /* @__PURE__ */ jsxDEV3("h2", { className: "text-2xl font-semibold mb-4", children: "Reward Distribution" }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 132,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("div", { className: "prose prose-invert max-w-none", children: /* @__PURE__ */ jsxDEV3("pre", { className: "whitespace-pre-wrap font-sans text-slate-300", children: campaign.distribution }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 134,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 133,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 131,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 123,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 122,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxDEV3("div", { className: "bg-slate-900/50 rounded-xl p-6 sticky top-8", children: [
        /* @__PURE__ */ jsxDEV3("div", { className: "flex items-center gap-2 text-slate-400 mb-6", children: [
          /* @__PURE__ */ jsxDEV3(Clock, { className: "w-5 h-5" }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 143,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("span", { children: [
            "Expires: ",
            new Date(campaign.expires_at).toLocaleDateString()
          ] }, void 0, !0, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 144,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 142,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV3(
          Link2,
          {
            to: `/campaigns/${campaign.id}/leaderboard`,
            className: "block w-full bg-[rgb(var(--primary))] text-slate-950 rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-all mb-4 text-center",
            children: "View Leaderboard"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 147,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 141,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 140,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/campaigns.$id.tsx",
    lineNumber: 95,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/campaigns.$id.tsx",
    lineNumber: 94,
    columnNumber: 5
  }, this);
}

// app/routes/referrals.tsx
var referrals_exports = {};
__export(referrals_exports, {
  action: () => action,
  default: () => Referrals,
  loader: () => loader3,
  meta: () => meta2
});
import { json as json3 } from "@remix-run/node";
import { Form, useLoaderData as useLoaderData3 } from "@remix-run/react";

// app/utils/supabase.server.ts
import { createServerClient as createServerClient3 } from "@supabase/auth-helpers-remix";
function createSupabaseServerClient(request, response) {
  return createServerClient3(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { request, response }
  );
}

// app/routes/referrals.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var meta2 = () => [
  { title: "My Referrals - Rewards Platform" },
  { name: "description", content: "Manage your referral codes" }
];
async function loader3({ request }) {
  let response = new Response(), supabase = createSupabaseServerClient(request, response), { data: { session } } = await supabase.auth.getSession();
  if (!session)
    throw new Error("Not authenticated");
  let { data: referralCodes } = await supabase.from("referral_codes").select(`
      *,
      referral_uses (
        id,
        referred_user_id,
        created_at
      )
    `).eq("user_id", session.user.id).order("created_at", { ascending: !1 });
  return json3(
    { referralCodes },
    { headers: response.headers }
  );
}
async function action({ request }) {
  let response = new Response(), supabase = createSupabaseServerClient(request, response), { data: { session } } = await supabase.auth.getSession();
  if (!session)
    throw new Error("Not authenticated");
  let formData = await request.formData(), maxUses = formData.get("maxUses") ? parseInt(formData.get("maxUses")) : null, expiresAt = formData.get("expiresAt") || null, code = `${session.user.id.slice(0, 6)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase(), { error } = await supabase.from("referral_codes").insert({
    user_id: session.user.id,
    code,
    max_uses: maxUses,
    expires_at: expiresAt
  });
  return error ? json3(
    { error: error.message },
    { status: 400, headers: response.headers }
  ) : json3(
    { success: !0 },
    { headers: response.headers }
  );
}
function Referrals() {
  let { referralCodes } = useLoaderData3(), copyToClipboard = (code) => {
    let url = `${window.location.origin}/signup?ref=${code}`;
    navigator.clipboard.writeText(url);
  };
  return /* @__PURE__ */ jsxDEV4("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxDEV4("nav", { className: "bg-[#2d2d2d] p-4", children: /* @__PURE__ */ jsxDEV4("div", { className: "container mx-auto flex justify-between items-center", children: /* @__PURE__ */ jsxDEV4("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV4(Trophy, { className: "w-6 h-6 text-[rgb(var(--primary))]" }, void 0, !1, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 92,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("span", { className: "text-xl font-bold", children: "My Referrals" }, void 0, !1, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 93,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/referrals.tsx",
      lineNumber: 91,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/referrals.tsx",
      lineNumber: 90,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/referrals.tsx",
      lineNumber: 89,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("main", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxDEV4("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ jsxDEV4("h1", { className: "text-2xl font-bold", children: "Referral Codes" }, void 0, !1, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 100,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV4(Form, { method: "post", children: /* @__PURE__ */ jsxDEV4(
          "button",
          {
            type: "submit",
            className: "flex items-center gap-2 px-4 py-2 bg-[rgb(var(--primary))] text-[#1d1d1d] rounded-lg font-medium hover:opacity-90",
            children: [
              /* @__PURE__ */ jsxDEV4(Link, { className: "w-4 h-4" }, void 0, !1, {
                fileName: "app/routes/referrals.tsx",
                lineNumber: 106,
                columnNumber: 15
              }, this),
              "Generate New Code"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 102,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 101,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("div", { className: "grid gap-6", children: referralCodes?.map((referral) => /* @__PURE__ */ jsxDEV4("div", { className: "card", children: [
        /* @__PURE__ */ jsxDEV4("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsxDEV4("div", { children: [
          /* @__PURE__ */ jsxDEV4("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxDEV4("h3", { className: "text-xl font-bold font-mono", children: referral.code }, void 0, !1, {
              fileName: "app/routes/referrals.tsx",
              lineNumber: 118,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV4(
              "button",
              {
                onClick: () => copyToClipboard(referral.code),
                className: "p-1 hover:bg-[#3d3d3d] rounded transition-colors",
                children: /* @__PURE__ */ jsxDEV4(Copy, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "app/routes/referrals.tsx",
                  lineNumber: 123,
                  columnNumber: 23
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/routes/referrals.tsx",
                lineNumber: 119,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 117,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4("p", { className: "text-gray-400", children: [
            "Uses: ",
            referral.uses,
            referral.max_uses ? `/${referral.max_uses}` : "",
            " \xB7 Created: ",
            new Date(referral.created_at).toLocaleDateString(),
            referral.expires_at && ` \xB7 Expires: ${new Date(referral.expires_at).toLocaleDateString()}`
          ] }, void 0, !0, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 126,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 116,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 115,
          columnNumber: 15
        }, this),
        referral.referral_uses.length > 0 && /* @__PURE__ */ jsxDEV4("div", { className: "mt-4 pt-4 border-t border-[#3d3d3d]", children: [
          /* @__PURE__ */ jsxDEV4("h4", { className: "text-sm font-medium text-gray-400 mb-2", children: "Recent Signups" }, void 0, !1, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 135,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4("div", { className: "space-y-2", children: referral.referral_uses.map((use) => /* @__PURE__ */ jsxDEV4("div", { className: "text-sm", children: new Date(use.created_at).toLocaleDateString() }, use.id, !1, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 138,
            columnNumber: 23
          }, this)) }, void 0, !1, {
            fileName: "app/routes/referrals.tsx",
            lineNumber: 136,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/referrals.tsx",
          lineNumber: 134,
          columnNumber: 17
        }, this)
      ] }, referral.id, !0, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 114,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: "app/routes/referrals.tsx",
        lineNumber: 112,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/referrals.tsx",
      lineNumber: 98,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/referrals.tsx",
    lineNumber: 88,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader4,
  meta: () => meta3
});
import { json as json4 } from "@remix-run/node";
import { Link as Link4, useLoaderData as useLoaderData4 } from "@remix-run/react";
import { createServerClient as createServerClient4 } from "@supabase/auth-helpers-remix";

// app/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// app/components/ui/lamp.tsx
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function Lamp({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxDEV5(
    "div",
    {
      className: cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      ),
      children: /* @__PURE__ */ jsxDEV5("div", { className: "relative flex w-full flex-1 flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxDEV5("div", { className: "pointer-events-none absolute inset-0 z-30 bg-slate-950 [mask-image:radial-gradient(circle_at_50%_0%,transparent,black)]" }, void 0, !1, {
          fileName: "app/components/ui/lamp.tsx",
          lineNumber: 19,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5("div", { className: "absolute inset-0 z-0 overflow-hidden", children: /* @__PURE__ */ jsxDEV5("div", { className: "absolute -top-[40rem] left-1/2 h-[80rem] w-[80rem] -translate-x-1/2 rounded-full bg-[rgb(var(--primary))] opacity-20 blur-3xl" }, void 0, !1, {
          fileName: "app/components/ui/lamp.tsx",
          lineNumber: 21,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/components/ui/lamp.tsx",
          lineNumber: 20,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV5("div", { className: "relative z-40 flex w-full flex-col items-center px-4", children }, void 0, !1, {
          fileName: "app/components/ui/lamp.tsx",
          lineNumber: 23,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/ui/lamp.tsx",
        lineNumber: 18,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/lamp.tsx",
      lineNumber: 12,
      columnNumber: 5
    },
    this
  );
}

// app/components/ui/logo.tsx
import { Link as Link3 } from "@remix-run/react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
function Logo() {
  return /* @__PURE__ */ jsxDEV6(Link3, { to: "/", className: "inline-flex items-center gap-3", children: [
    /* @__PURE__ */ jsxDEV6(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 0 375 375",
        className: "text-[rgb(var(--primary))]",
        children: [
          /* @__PURE__ */ jsxDEV6("defs", { children: [
            /* @__PURE__ */ jsxDEV6("clipPath", { id: "2468e837ce", children: /* @__PURE__ */ jsxDEV6("path", { d: "M 40 44 L 331 44 L 331 335 L 40 335 Z M 40 44" }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 15,
              columnNumber: 13
            }, this) }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 14,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV6("clipPath", { id: "e5ba6f20f8", children: /* @__PURE__ */ jsxDEV6("path", { d: "M 272.589844 3.695312 L 371.410156 276.605469 L 98.503906 375.425781 L -0.320312 102.519531 Z M 272.589844 3.695312" }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 18,
              columnNumber: 13
            }, this) }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 17,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV6("clipPath", { id: "eb5849a224", children: /* @__PURE__ */ jsxDEV6("path", { d: "M 272.589844 3.695312 L 371.410156 276.605469 L 98.503906 375.425781 L -0.320312 102.519531 Z M 272.589844 3.695312" }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 21,
              columnNumber: 13
            }, this) }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 20,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/ui/logo.tsx",
            lineNumber: 13,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV6("g", { clipPath: "url(#2468e837ce)", children: /* @__PURE__ */ jsxDEV6("g", { clipPath: "url(#e5ba6f20f8)", children: /* @__PURE__ */ jsxDEV6("g", { clipPath: "url(#eb5849a224)", children: /* @__PURE__ */ jsxDEV6(
            "path",
            {
              fill: "currentColor",
              d: "M 321.941406 139.984375 C 294.683594 64.714844 211.574219 25.792969 136.300781 53.046875 C 61.03125 80.304688 22.109375 163.414062 49.363281 238.6875 C 76.621094 313.957031 159.730469 352.878906 235.003906 325.625 C 310.273438 298.367188 349.195312 215.257812 321.941406 139.984375 Z M 232.101562 172.515625 C 227.484375 159.761719 217.96875 149.699219 205.3125 144.175781 C 193.601562 139.0625 180.648438 138.609375 168.832031 142.886719 C 154.921875 147.925781 139.554688 140.726562 134.515625 126.816406 C 129.480469 112.902344 136.675781 97.539062 150.589844 92.5 C 175.359375 83.53125 202.402344 84.4375 226.738281 95.058594 C 252.636719 106.355469 272.953125 127.9375 282.488281 154.269531 C 287.527344 168.183594 280.332031 183.550781 266.417969 188.585938 C 252.503906 193.625 237.140625 186.429688 232.101562 172.515625 Z M 232.101562 172.515625"
            },
            void 0,
            !1,
            {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 27,
              columnNumber: 15
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/ui/logo.tsx",
            lineNumber: 26,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/ui/logo.tsx",
            lineNumber: 25,
            columnNumber: 11
          }, this) }, void 0, !1, {
            fileName: "app/components/ui/logo.tsx",
            lineNumber: 24,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/ui/logo.tsx",
        lineNumber: 6,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV6("span", { className: "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500/80", children: "KaitoRewards" }, void 0, !1, {
      fileName: "app/components/ui/logo.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/ui/logo.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var meta3 = () => [
  { title: "KaitoRewards - Earn Rewards for Your Contributions" },
  { name: "description", content: "Discover exciting rewards and opportunities" }
];
async function loader4({ request }) {
  let response = new Response(), supabase = createServerClient4(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { request, response }
  ), testData = {
    rewards: [
      {
        id: "1",
        title: "Early Access NFT Drop",
        description: "Get exclusive early access to our upcoming NFT collection",
        expires_at: "2025-04-01",
        value: 500,
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
        featured: !0,
        isNew: !0
      },
      {
        id: "2",
        title: "Community Moderator Role",
        description: "Become a moderator in our growing community",
        expires_at: "2025-03-28",
        value: 300,
        image: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&auto=format&fit=crop&q=60",
        featured: !0,
        isNew: !0
      },
      {
        id: "3",
        title: "Premium Membership",
        description: "1-year premium membership with exclusive benefits",
        expires_at: "2025-03-25",
        value: 1e3,
        image: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=800&auto=format&fit=crop&q=60",
        featured: !0,
        isAd: !0
      },
      {
        id: "4",
        title: "Limited Edition Merch",
        description: "Exclusive merchandise only for reward holders",
        expires_at: "2025-04-15",
        value: 150,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60",
        featured: !1
      },
      {
        id: "5",
        title: "VIP Gaming Tournament",
        description: "Participate in our exclusive gaming tournament with pro players",
        expires_at: "2025-04-20",
        value: 750,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60",
        featured: !0,
        isNew: !0
      },
      {
        id: "6",
        title: "Crypto Trading Course",
        description: "Learn advanced crypto trading strategies from experts",
        expires_at: "2025-04-10",
        value: 450,
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60",
        featured: !0,
        isAd: !0
      },
      {
        id: "7",
        title: "Exclusive Discord Access",
        description: "Join our private Discord channels with industry leaders",
        expires_at: "2025-04-05",
        value: 200,
        image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&auto=format&fit=crop&q=60",
        featured: !1
      },
      {
        id: "8",
        title: "AI Workshop Series",
        description: "Hands-on workshops about artificial intelligence and machine learning",
        expires_at: "2025-04-30",
        value: 800,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
        featured: !1
      }
    ]
  }, featuredRewards = testData.rewards.filter((reward) => reward.featured), rewards = testData.rewards;
  return json4(
    { rewards, featuredRewards },
    { headers: response.headers }
  );
}
function Badge({ children, className = "" }) {
  return /* @__PURE__ */ jsxDEV7("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${className}`, children }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, this);
}
function RewardCard({ reward }) {
  return /* @__PURE__ */ jsxDEV7(Link4, { to: `/campaigns/${reward.id}`, className: "block h-full", children: /* @__PURE__ */ jsxDEV7("div", { className: "card hover:scale-[1.02] transition-all h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800", children: [
    /* @__PURE__ */ jsxDEV7("div", { className: "absolute -top-4 -right-4 w-12 h-12 rounded-full overflow-hidden border-4 border-slate-900 shadow-xl", children: /* @__PURE__ */ jsxDEV7(
      "img",
      {
        src: reward.image,
        alt: reward.title,
        className: "w-full h-full object-cover"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_index.tsx",
        lineNumber: 127,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 126,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { className: "flex justify-between items-start mb-3", children: /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxDEV7("h3", { className: "text-xl font-bold text-white", children: reward.title }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 135,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "flex gap-2", children: [
        reward.isNew && /* @__PURE__ */ jsxDEV7(Badge, { className: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20", children: "New" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 138,
          columnNumber: 17
        }, this),
        reward.isAd && /* @__PURE__ */ jsxDEV7(Badge, { className: "bg-blue-500/10 text-blue-500 border border-blue-500/20", children: "Ad" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 143,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 136,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 134,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 133,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-300 mb-4 line-clamp-2", children: reward.description }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 150,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { className: "text-2xl font-bold text-[rgb(var(--primary))] mb-4", children: [
      "$",
      typeof reward.value == "number" ? reward.value.toLocaleString() : "0"
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 151,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center gap-2 text-slate-400", children: [
      /* @__PURE__ */ jsxDEV7(Clock, { className: "w-4 h-4" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 155,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("span", { children: [
        "Expires: ",
        new Date(reward.expires_at).toLocaleDateString()
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 156,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 154,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 125,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 124,
    columnNumber: 5
  }, this);
}
function Index() {
  let { rewards, featuredRewards } = useLoaderData4();
  return /* @__PURE__ */ jsxDEV7("div", { className: "min-h-screen bg-slate-950", children: [
    /* @__PURE__ */ jsxDEV7("header", { className: "absolute top-0 left-0 right-0 z-50", children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxDEV7("div", { className: "h-24 flex items-center", children: /* @__PURE__ */ jsxDEV7(Logo, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 171,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 170,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 169,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 168,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(Lamp, { children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "mb-16", children: /* @__PURE__ */ jsxDEV7("div", { className: "p-4 max-w-7xl mx-auto w-full pt-32 md:pt-24", children: [
        /* @__PURE__ */ jsxDEV7("h1", { className: "text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80", children: [
          "Discover Exclusive ",
          /* @__PURE__ */ jsxDEV7("br", {}, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 181,
            columnNumber: 36
          }, this),
          " Rewards & Campaigns"
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 180,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("p", { className: "mt-4 font-normal text-base text-slate-400 max-w-lg text-center mx-auto", children: "Stay ahead of the curve with KaitoRewards. Get early access to upcoming campaigns, exclusive memberships, and unique opportunities." }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 183,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "mt-8 flex justify-center gap-4", children: [
          /* @__PURE__ */ jsxDEV7(
            Link4,
            {
              to: "/signup",
              className: "px-6 py-3 bg-[rgb(var(--primary))] text-slate-950 rounded-lg font-medium hover:opacity-90 transition-all",
              children: "Get Started"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 188,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7(
            Link4,
            {
              to: "#featured",
              className: "px-6 py-3 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-all backdrop-blur-sm",
              children: "View Rewards"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 194,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 187,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 179,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 178,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "mb-12", id: "featured", children: [
        /* @__PURE__ */ jsxDEV7("h2", { className: "text-2xl font-bold mb-6 text-white", children: "Featured Rewards" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 205,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: featuredRewards?.map((reward) => /* @__PURE__ */ jsxDEV7(RewardCard, { reward }, reward.id, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 208,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 206,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 204,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { children: [
        /* @__PURE__ */ jsxDEV7("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxDEV7("h2", { className: "text-2xl font-bold text-white", children: "All Rewards" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 215,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxDEV7("button", { className: "text-slate-400 hover:text-white transition-colors", children: "Latest" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 217,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("button", { className: "text-slate-400 hover:text-white transition-colors", children: "Value \u2191" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 220,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 216,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 214,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: rewards?.map((reward) => /* @__PURE__ */ jsxDEV7(RewardCard, { reward }, reward.id, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 227,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 225,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 213,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 177,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 176,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 167,
    columnNumber: 5
  }, this);
}

// app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  action: () => action2,
  default: () => SignUp,
  loader: () => loader5,
  meta: () => meta4
});
import { json as json5, redirect } from "@remix-run/node";
import { Form as Form2, useLoaderData as useLoaderData5, Link as Link5 } from "@remix-run/react";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var meta4 = () => [
  { title: "Sign Up - Campaign Platform" },
  { name: "description", content: "Create your account" }
];
async function loader5({ request }) {
  let response = new Response(), supabase = createSupabaseServerClient(request, response), { data: { session } } = await supabase.auth.getSession();
  return session ? redirect("/admin") : json5(
    {},
    { headers: response.headers }
  );
}
async function action2({ request }) {
  let response = new Response(), supabase = createSupabaseServerClient(request, response), formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: email.split("@")[0]
      }
    }
  });
  if (signUpError)
    return json5(
      { error: signUpError.message },
      { status: 400, headers: response.headers }
    );
  if (signUpData?.user) {
    let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (signInError)
      return json5(
        { error: signInError.message },
        { status: 400, headers: response.headers }
      );
    if (signInData?.user)
      return redirect("/admin", {
        headers: response.headers
      });
  }
  return json5(
    { error: "Failed to create account" },
    { status: 400, headers: response.headers }
  );
}
function SignUp() {
  let { error } = useLoaderData5();
  return /* @__PURE__ */ jsxDEV8("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxDEV8("div", { className: "bg-[#2d2d2d] p-8 rounded-lg shadow-lg w-full max-w-md", children: [
    /* @__PURE__ */ jsxDEV8("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsxDEV8(UserPlus, { className: "w-8 h-8 text-[rgb(var(--primary))]" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV8("h1", { className: "text-2xl font-bold", children: "Create Account" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 89,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 87,
      columnNumber: 9
    }, this),
    error && /* @__PURE__ */ jsxDEV8("div", { className: "bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4", children: error }, void 0, !1, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 93,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV8(Form2, { method: "post", children: /* @__PURE__ */ jsxDEV8("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV8("div", { children: [
        /* @__PURE__ */ jsxDEV8("label", { htmlFor: "email", className: "block text-sm font-medium mb-1", children: "Email" }, void 0, !1, {
          fileName: "app/routes/signup.tsx",
          lineNumber: 101,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV8(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            required: !0,
            className: "w-full px-4 py-2 rounded bg-[#1d1d1d] border border-[#3d3d3d] focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/signup.tsx",
            lineNumber: 104,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 100,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV8("div", { children: [
        /* @__PURE__ */ jsxDEV8("label", { htmlFor: "password", className: "block text-sm font-medium mb-1", children: "Password" }, void 0, !1, {
          fileName: "app/routes/signup.tsx",
          lineNumber: 114,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV8(
          "input",
          {
            type: "password",
            id: "password",
            name: "password",
            required: !0,
            minLength: 6,
            className: "w-full px-4 py-2 rounded bg-[#1d1d1d] border border-[#3d3d3d] focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/signup.tsx",
            lineNumber: 117,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 113,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV8(
        "button",
        {
          type: "submit",
          className: "w-full px-4 py-2 bg-[rgb(var(--primary))] text-[#1d1d1d] rounded-lg font-medium hover:opacity-90",
          children: "Create Account"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.tsx",
          lineNumber: 127,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV8("p", { className: "text-center text-sm text-gray-400", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxDEV8(Link5, { to: "/login", className: "text-[rgb(var(--primary))] hover:underline", children: "Sign in" }, void 0, !1, {
          fileName: "app/routes/signup.tsx",
          lineNumber: 136,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 134,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 99,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 98,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/signup.tsx",
    lineNumber: 86,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/signup.tsx",
    lineNumber: 85,
    columnNumber: 5
  }, this);
}

// app/routes/admin.tsx
var admin_exports = {};
__export(admin_exports, {
  action: () => action3,
  default: () => Admin,
  loader: () => loader6,
  meta: () => meta5
});
import { json as json6, redirect as redirect2 } from "@remix-run/node";
import { Form as Form3, useLoaderData as useLoaderData6, useNavigation, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { Fragment, jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var meta5 = () => [
  { title: "Admin - Campaign Platform" },
  { name: "description", content: "Manage your campaigns" }
];
async function loader6({ request }) {
  let response = new Response(), supabase = createSupabaseServerClient(request, response), { data: { session } } = await supabase.auth.getSession();
  if (!session)
    return redirect2("/login");
  let { data: campaigns, error } = await supabase.from("campaigns").select("*").eq("user_id", session.user.id).order("created_at", { ascending: !1 });
  return error ? (console.error("Error fetching campaigns:", error), json6(
    { campaigns: [], error: error.message },
    { headers: response.headers }
  )) : json6(
    { campaigns: campaigns || [] },
    { headers: response.headers }
  );
}
async function action3({ request }) {
  let response = new Response(), supabase = createSupabaseServerClient(request, response), { data: { session } } = await supabase.auth.getSession();
  if (!session)
    return redirect2("/login");
  let formData = await request.formData(), intent = formData.get("intent");
  if (intent === "delete") {
    let id = formData.get("id"), { error } = await supabase.from("campaigns").delete().eq("id", id).eq("user_id", session.user.id);
    return error ? json6(
      { error: error.message },
      { status: 400, headers: response.headers }
    ) : json6(
      { success: !0 },
      { headers: response.headers }
    );
  }
  if (intent === "create" || intent === "update") {
    let id = formData.get("id"), title = formData.get("title"), description = formData.get("description"), longDescription = formData.get("longDescription"), distributionDetails = formData.get("distributionDetails"), imageUrl = formData.get("imageUrl"), rewardAmount = formData.get("rewardAmount"), isFeatured = formData.get("isFeatured") === "on", isNew = formData.get("isNew") === "on", isSponsored = formData.get("isSponsored") === "on", expiresAt = formData.get("expiresAt") || null, tagsArray = formData.get("tags").split(",").map((tag) => tag.trim()).filter(Boolean), campaignData = {
      user_id: session.user.id,
      title,
      description,
      long_description: longDescription,
      distribution_details: distributionDetails,
      image_url: imageUrl,
      reward_amount: rewardAmount,
      is_featured: isFeatured,
      is_new: isNew,
      is_sponsored: isSponsored,
      expires_at: expiresAt,
      tags: tagsArray
    };
    if (intent === "create") {
      let { error } = await supabase.from("campaigns").insert([campaignData]);
      if (error)
        return json6(
          { error: error.message },
          { status: 400, headers: response.headers }
        );
    } else {
      let { error } = await supabase.from("campaigns").update(campaignData).eq("id", id).eq("user_id", session.user.id);
      if (error)
        return json6(
          { error: error.message },
          { status: 400, headers: response.headers }
        );
    }
    return json6(
      { success: !0 },
      { headers: response.headers }
    );
  }
  return json6(
    { error: "Invalid action" },
    { status: 400, headers: response.headers }
  );
}
function CampaignForm({ campaign = null, onCancel }) {
  let isSubmitting = useNavigation().state === "submitting";
  return /* @__PURE__ */ jsxDEV9(Form3, { method: "post", className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV9("input", { type: "hidden", name: "intent", value: campaign ? "update" : "create" }, void 0, !1, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 153,
      columnNumber: 7
    }, this),
    campaign && /* @__PURE__ */ jsxDEV9("input", { type: "hidden", name: "id", value: campaign.id }, void 0, !1, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 154,
      columnNumber: 20
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxDEV9("div", { children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "title", className: "block text-sm font-medium mb-1", children: "Title *" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 158,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "input",
          {
            type: "text",
            id: "title",
            name: "title",
            required: !0,
            defaultValue: campaign?.title,
            className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 161,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 157,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "imageUrl", className: "block text-sm font-medium mb-1", children: "Image URL" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 172,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "input",
          {
            type: "url",
            id: "imageUrl",
            name: "imageUrl",
            defaultValue: campaign?.image_url,
            className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 175,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 171,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "description", className: "block text-sm font-medium mb-1", children: "Short Description *" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 185,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "textarea",
          {
            id: "description",
            name: "description",
            required: !0,
            defaultValue: campaign?.description,
            rows: 2,
            className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 188,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 184,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "rewardAmount", className: "block text-sm font-medium mb-1", children: "Reward Amount *" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 199,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "input",
          {
            type: "text",
            id: "rewardAmount",
            name: "rewardAmount",
            required: !0,
            defaultValue: campaign?.reward_amount,
            className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 202,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 198,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "longDescription", className: "block text-sm font-medium mb-1", children: "Long Description" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 213,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "textarea",
          {
            id: "longDescription",
            name: "longDescription",
            defaultValue: campaign?.long_description,
            rows: 4,
            className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 216,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 212,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "distributionDetails", className: "block text-sm font-medium mb-1", children: "Distribution Details" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 226,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "textarea",
          {
            id: "distributionDetails",
            name: "distributionDetails",
            defaultValue: campaign?.distribution_details,
            rows: 4,
            className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 229,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 225,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "tags", className: "block text-sm font-medium mb-1", children: "Tags (comma-separated)" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 239,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "input",
          {
            type: "text",
            id: "tags",
            name: "tags",
            defaultValue: campaign?.tags ? campaign.tags.join(", ") : "",
            className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]",
            placeholder: "nft, gaming, crypto"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 242,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 238,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { children: [
        /* @__PURE__ */ jsxDEV9("label", { htmlFor: "expiresAt", className: "block text-sm font-medium mb-1", children: "Expiry Date" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 253,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9(
          "input",
          {
            type: "datetime-local",
            id: "expiresAt",
            name: "expiresAt",
            defaultValue: campaign?.expires_at ? new Date(campaign.expires_at).toISOString().slice(0, 16) : "",
            className: "w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 256,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 252,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsxDEV9("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV9(
            "input",
            {
              type: "checkbox",
              name: "isFeatured",
              defaultChecked: campaign?.is_featured,
              className: "w-4 h-4 rounded bg-slate-800 border-slate-700 text-[rgb(var(--primary))]"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/admin.tsx",
              lineNumber: 267,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV9("span", { className: "text-sm", children: "Featured" }, void 0, !1, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 273,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 266,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV9(
            "input",
            {
              type: "checkbox",
              name: "isNew",
              defaultChecked: campaign?.is_new ?? !0,
              className: "w-4 h-4 rounded bg-slate-800 border-slate-700 text-[rgb(var(--primary))]"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/admin.tsx",
              lineNumber: 277,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV9("span", { className: "text-sm", children: "New" }, void 0, !1, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 283,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 276,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV9(
            "input",
            {
              type: "checkbox",
              name: "isSponsored",
              defaultChecked: campaign?.is_sponsored,
              className: "w-4 h-4 rounded bg-slate-800 border-slate-700 text-[rgb(var(--primary))]"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/admin.tsx",
              lineNumber: 287,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV9("span", { className: "text-sm", children: "Sponsored" }, void 0, !1, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 293,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 286,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 265,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 156,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { className: "flex justify-end gap-4", children: [
      onCancel && /* @__PURE__ */ jsxDEV9(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700",
          children: "Cancel"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/admin.tsx",
          lineNumber: 300,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV9(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: "flex items-center gap-2 px-6 py-2 bg-[rgb(var(--primary))] text-slate-950 rounded-lg font-medium hover:opacity-90 disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsxDEV9(Plus, { className: "w-4 h-4" }, void 0, !1, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 313,
              columnNumber: 11
            }, this),
            isSubmitting ? campaign ? "Updating..." : "Creating..." : campaign ? "Update Campaign" : "Create Campaign"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/admin.tsx",
          lineNumber: 308,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 298,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 152,
    columnNumber: 5
  }, this);
}
function Admin() {
  let { campaigns } = useLoaderData6(), [editingCampaign, setEditingCampaign] = useState(null), [showCreateForm, setShowCreateForm] = useState(!1), submit = useSubmit(), handleDelete = (campaign) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      let formData = new FormData();
      formData.append("intent", "delete"), formData.append("id", campaign.id), submit(formData, { method: "post" });
    }
  };
  return /* @__PURE__ */ jsxDEV9("div", { className: "min-h-screen bg-slate-950", children: [
    /* @__PURE__ */ jsxDEV9("nav", { className: "bg-slate-900 border-b border-slate-800 p-4", children: /* @__PURE__ */ jsxDEV9("div", { className: "container mx-auto flex justify-between items-center", children: /* @__PURE__ */ jsxDEV9("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV9(Trophy, { className: "w-6 h-6 text-[rgb(var(--primary))]" }, void 0, !1, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 341,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV9("span", { className: "text-xl font-bold", children: "Admin Dashboard" }, void 0, !1, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 342,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 340,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 339,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 338,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("main", { className: "container mx-auto px-4 py-8", children: [
      editingCampaign ? /* @__PURE__ */ jsxDEV9("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxDEV9("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxDEV9("h2", { className: "text-2xl font-bold", children: "Edit Campaign" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 351,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 350,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV9("div", { className: "bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6", children: /* @__PURE__ */ jsxDEV9(
          CampaignForm,
          {
            campaign: editingCampaign,
            onCancel: () => setEditingCampaign(null)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 354,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 353,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 349,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV9("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxDEV9(
          "button",
          {
            onClick: () => setShowCreateForm(!showCreateForm),
            className: "flex items-center gap-2 text-2xl font-bold mb-6",
            children: [
              "Create New Campaign",
              showCreateForm ? /* @__PURE__ */ jsxDEV9(ChevronUp, { className: "w-6 h-6" }, void 0, !1, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 368,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDEV9(ChevronDown, { className: "w-6 h-6" }, void 0, !1, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 370,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/admin.tsx",
            lineNumber: 362,
            columnNumber: 13
          },
          this
        ),
        showCreateForm && /* @__PURE__ */ jsxDEV9("div", { className: "bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6", children: /* @__PURE__ */ jsxDEV9(CampaignForm, {}, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 375,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 374,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 361,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { children: [
        /* @__PURE__ */ jsxDEV9("h2", { className: "text-2xl font-bold mb-6", children: "Your Campaigns" }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 382,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV9("div", { className: "grid gap-6", children: [
          campaigns?.map((campaign) => /* @__PURE__ */ jsxDEV9("div", { className: "bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6", children: /* @__PURE__ */ jsxDEV9("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxDEV9("div", { children: [
              /* @__PURE__ */ jsxDEV9("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxDEV9("h3", { className: "text-xl font-bold", children: campaign.title }, void 0, !1, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 389,
                  columnNumber: 23
                }, this),
                campaign.is_featured && /* @__PURE__ */ jsxDEV9("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]", children: "Featured" }, void 0, !1, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 391,
                  columnNumber: 25
                }, this),
                campaign.is_new && /* @__PURE__ */ jsxDEV9("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-500", children: "New" }, void 0, !1, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 396,
                  columnNumber: 25
                }, this),
                campaign.is_sponsored && /* @__PURE__ */ jsxDEV9("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-500", children: "Sponsored" }, void 0, !1, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 401,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 388,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV9("p", { className: "text-slate-400 mb-4", children: campaign.description }, void 0, !1, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 406,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV9("div", { className: "flex gap-4 text-sm text-slate-500", children: [
                /* @__PURE__ */ jsxDEV9("span", { children: [
                  "Reward: $",
                  campaign.reward_amount
                ] }, void 0, !0, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 408,
                  columnNumber: 23
                }, this),
                campaign.expires_at && /* @__PURE__ */ jsxDEV9(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV9("span", { children: "\u2022" }, void 0, !1, {
                    fileName: "app/routes/admin.tsx",
                    lineNumber: 411,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV9("span", { children: [
                    "Expires: ",
                    new Date(campaign.expires_at).toLocaleDateString()
                  ] }, void 0, !0, {
                    fileName: "app/routes/admin.tsx",
                    lineNumber: 412,
                    columnNumber: 27
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 410,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 407,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 387,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV9("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxDEV9(
                "button",
                {
                  onClick: () => setEditingCampaign(campaign),
                  className: "px-3 py-1 bg-slate-800 text-white rounded hover:bg-slate-700",
                  children: "Edit"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 418,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV9(
                "button",
                {
                  onClick: () => handleDelete(campaign),
                  className: "px-3 py-1 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20",
                  children: "Delete"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 424,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 417,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 386,
            columnNumber: 17
          }, this) }, campaign.id, !1, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 385,
            columnNumber: 15
          }, this)),
          campaigns?.length === 0 && /* @__PURE__ */ jsxDEV9("div", { className: "bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6 flex items-center justify-center gap-3 text-slate-400", children: [
            /* @__PURE__ */ jsxDEV9(AlertCircle, { className: "w-5 h-5" }, void 0, !1, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 437,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV9("span", { children: "No campaigns found. Create your first campaign above!" }, void 0, !1, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 438,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 436,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 383,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 381,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 347,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 337,
    columnNumber: 5
  }, this);
}

// app/routes/login/route.tsx
var route_exports = {};
__export(route_exports, {
  action: () => action4,
  default: () => Login,
  loader: () => loader7,
  meta: () => meta6
});
import { json as json7, redirect as redirect3 } from "@remix-run/node";
import { Form as Form4, useLoaderData as useLoaderData7, Link as Link6 } from "@remix-run/react";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var meta6 = () => [
  { title: "Login - Campaign Platform" },
  { name: "description", content: "Login to manage your campaigns" }
];
async function loader7({ request }) {
  let response = new Response(), supabase = createSupabaseServerClient(request, response), { data: { session } } = await supabase.auth.getSession();
  if (session)
    return redirect3("/admin");
  let message = new URL(request.url).searchParams.get("message");
  return json7(
    { message },
    { headers: response.headers }
  );
}
async function action4({ request }) {
  let response = new Response(), supabase = createSupabaseServerClient(request, response), formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return error ? json7(
    { error: error.message },
    { status: 400, headers: response.headers }
  ) : data?.user ? redirect3("/admin", {
    headers: response.headers
  }) : json7(
    { error: "Something went wrong" },
    { status: 400, headers: response.headers }
  );
}
function Login() {
  let { error, message } = useLoaderData7();
  return /* @__PURE__ */ jsxDEV10("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxDEV10("div", { className: "bg-[#2d2d2d] p-8 rounded-lg shadow-lg w-full max-w-md", children: [
    /* @__PURE__ */ jsxDEV10("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsxDEV10(Lock, { className: "w-8 h-8 text-[rgb(var(--primary))]" }, void 0, !1, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV10("h1", { className: "text-2xl font-bold", children: "Login" }, void 0, !1, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 68,
      columnNumber: 9
    }, this),
    error && /* @__PURE__ */ jsxDEV10("div", { className: "bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4", children: error }, void 0, !1, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 74,
      columnNumber: 11
    }, this),
    message && /* @__PURE__ */ jsxDEV10("div", { className: "bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded mb-4", children: message }, void 0, !1, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 80,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV10(Form4, { method: "post", children: /* @__PURE__ */ jsxDEV10("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV10("div", { children: [
        /* @__PURE__ */ jsxDEV10("label", { htmlFor: "email", className: "block text-sm font-medium mb-1", children: "Email" }, void 0, !1, {
          fileName: "app/routes/login/route.tsx",
          lineNumber: 88,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            required: !0,
            className: "w-full px-4 py-2 rounded bg-[#1d1d1d] border border-[#3d3d3d] focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login/route.tsx",
            lineNumber: 91,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 87,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV10("div", { children: [
        /* @__PURE__ */ jsxDEV10("label", { htmlFor: "password", className: "block text-sm font-medium mb-1", children: "Password" }, void 0, !1, {
          fileName: "app/routes/login/route.tsx",
          lineNumber: 101,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(
          "input",
          {
            type: "password",
            id: "password",
            name: "password",
            required: !0,
            className: "w-full px-4 py-2 rounded bg-[#1d1d1d] border border-[#3d3d3d] focus:outline-none focus:border-[rgb(var(--primary))]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login/route.tsx",
            lineNumber: 104,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 100,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV10(
        "button",
        {
          type: "submit",
          className: "w-full px-4 py-2 bg-[rgb(var(--primary))] text-[#1d1d1d] rounded-lg font-medium hover:opacity-90",
          children: "Sign In"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login/route.tsx",
          lineNumber: 113,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV10("p", { className: "text-center text-sm text-gray-400", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxDEV10(Link6, { to: "/signup", className: "text-[rgb(var(--primary))] hover:underline", children: "Sign up" }, void 0, !1, {
          fileName: "app/routes/login/route.tsx",
          lineNumber: 122,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login/route.tsx",
        lineNumber: 120,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 86,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/login/route.tsx",
      lineNumber: 85,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login/route.tsx",
    lineNumber: 67,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/login/route.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-EFWKH4UU.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-YXI754PJ.js", "/build/_shared/chunk-PQM23IGJ.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-TPR6PMZT.js", imports: ["/build/_shared/chunk-EAERLIQE.js", "/build/_shared/chunk-PH7FC7E6.js", "/build/_shared/chunk-G7CHZRZX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-HVSUTTDK.js", imports: ["/build/_shared/chunk-WWM5K4CA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/admin": { id: "routes/admin", parentId: "root", path: "admin", index: void 0, caseSensitive: void 0, module: "/build/routes/admin-ZQPZ5D5W.js", imports: ["/build/_shared/chunk-L6MISQIZ.js", "/build/_shared/chunk-WWM5K4CA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/campaigns.$id": { id: "routes/campaigns.$id", parentId: "root", path: "campaigns/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/campaigns.$id-PXR5IHEW.js", imports: ["/build/_shared/chunk-WWM5K4CA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-GFU4P4GR.js", imports: ["/build/_shared/chunk-L6MISQIZ.js", "/build/_shared/chunk-WWM5K4CA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/referrals": { id: "routes/referrals", parentId: "root", path: "referrals", index: void 0, caseSensitive: void 0, module: "/build/routes/referrals-GJIBCBVR.js", imports: ["/build/_shared/chunk-L6MISQIZ.js", "/build/_shared/chunk-WWM5K4CA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-FZXHGLS6.js", imports: ["/build/_shared/chunk-L6MISQIZ.js", "/build/_shared/chunk-WWM5K4CA.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "2fb236e1", hmr: { runtime: "/build/_shared/chunk-PQM23IGJ.js", timestamp: 1742628707944 }, url: "/build/manifest-2FB236E1.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !0, v3_relativeSplatPath: !0, v3_throwAbortReason: !0, v3_routeConfig: !1, v3_singleFetch: !0, v3_lazyRouteDiscovery: !0, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/campaigns.$id": {
    id: "routes/campaigns.$id",
    parentId: "root",
    path: "campaigns/:id",
    index: void 0,
    caseSensitive: void 0,
    module: campaigns_id_exports
  },
  "routes/referrals": {
    id: "routes/referrals",
    parentId: "root",
    path: "referrals",
    index: void 0,
    caseSensitive: void 0,
    module: referrals_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
/*! Bundled license information:

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/alert-circle.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/arrow-left.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/chevron-down.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/chevron-up.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/clock.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/copy.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/link.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/lock.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/plus.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/trophy.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/user-plus.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=index.js.map
