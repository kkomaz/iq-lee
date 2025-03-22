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
  links: () => links
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-L4AWIEGB.css";

// app/root.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [{ rel: "stylesheet", href: tailwind_default }];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { className: "bg-slate-950 text-white", children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 24,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

// app/routes/campaigns.$id.tsx
var campaigns_id_exports = {};
__export(campaigns_id_exports, {
  default: () => CampaignDetail,
  loader: () => loader,
  meta: () => meta
});
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

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

// node_modules/lucide-react/dist/esm/icons/arrow-left.js
var ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);

// node_modules/lucide-react/dist/esm/icons/clock.js
var Clock = createLucideIcon("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
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

// app/routes/campaigns.$id.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Campaign Details - KaitoRewards" },
  {
    name: "description",
    content: "Learn more about this campaign and how to participate"
  }
];
async function loader({ request, params }) {
  let response = new Response(), campaign = {
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
  return json({ campaign }, { headers: response.headers });
}
function CampaignDetail() {
  let { campaign } = useLoaderData();
  return /* @__PURE__ */ jsxDEV3("div", { className: "min-h-screen bg-slate-950", children: /* @__PURE__ */ jsxDEV3("div", { className: "mx-auto max-w-6xl px-6 py-8", children: [
    /* @__PURE__ */ jsxDEV3("div", { className: "flex items-center gap-4 mb-8", children: /* @__PURE__ */ jsxDEV3(
      Link,
      {
        to: "/",
        className: "flex items-center gap-2 text-slate-400 hover:text-white transition-colors",
        children: [
          /* @__PURE__ */ jsxDEV3(ArrowLeft, { className: "w-4 h-4" }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 95,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV3("span", { children: "Back to Campaigns" }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 96,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 91,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 90,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV3("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxDEV3("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxDEV3("div", { className: "w-16 h-16 bg-slate-900/50 rounded-full flex items-center justify-center border-2 border-[rgb(var(--primary))]", children: /* @__PURE__ */ jsxDEV3(Trophy, { className: "w-8 h-8 text-[rgb(var(--primary))]" }, void 0, !1, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 103,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 102,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { children: [
          /* @__PURE__ */ jsxDEV3("h1", { className: "text-4xl font-bold", children: campaign.title }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 106,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { className: "text-slate-400 mt-2", children: campaign.description }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 107,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 105,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { className: "bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2", children: /* @__PURE__ */ jsxDEV3("span", { className: "text-2xl font-bold", children: [
        "$",
        campaign.value.toLocaleString()
      ] }, void 0, !0, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 111,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 110,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 100,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV3("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxDEV3("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxDEV3("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxDEV3("section", { children: [
          /* @__PURE__ */ jsxDEV3("h2", { className: "text-2xl font-semibold mb-4", children: "About This Campaign" }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 121,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("div", { className: "prose prose-invert max-w-none", children: /* @__PURE__ */ jsxDEV3("pre", { className: "whitespace-pre-wrap font-sans text-slate-300", children: campaign.longDescription }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 125,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 124,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 120,
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
            lineNumber: 136,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 135,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 131,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 119,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxDEV3("div", { className: "bg-slate-900/50 rounded-xl p-6 sticky top-8", children: [
        /* @__PURE__ */ jsxDEV3("div", { className: "flex items-center gap-2 text-slate-400 mb-6", children: [
          /* @__PURE__ */ jsxDEV3(Clock, { className: "w-5 h-5" }, void 0, !1, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 147,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV3("span", { children: [
            "Expires: ",
            new Date(campaign.expires_at).toLocaleDateString()
          ] }, void 0, !0, {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 148,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/campaigns.$id.tsx",
          lineNumber: 146,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV3(
          Link,
          {
            to: `/campaigns/${campaign.id}/leaderboard`,
            className: "block w-full bg-[rgb(var(--primary))] text-slate-950 rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-all mb-4 text-center",
            children: "View Leaderboard"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/campaigns.$id.tsx",
            lineNumber: 153,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 145,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/campaigns.$id.tsx",
        lineNumber: 144,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/campaigns.$id.tsx",
      lineNumber: 117,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/campaigns.$id.tsx",
    lineNumber: 89,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/campaigns.$id.tsx",
    lineNumber: 88,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader2,
  meta: () => meta2
});
import { json as json2 } from "@remix-run/node";
import { Link as Link3, useLoaderData as useLoaderData2 } from "@remix-run/react";

// app/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// app/components/ui/lamp.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function Lamp({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxDEV4(
    "div",
    {
      className: cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      ),
      children: /* @__PURE__ */ jsxDEV4("div", { className: "relative flex w-full flex-1 flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxDEV4("div", { className: "pointer-events-none absolute inset-0 z-30 bg-slate-950 [mask-image:radial-gradient(circle_at_50%_0%,transparent,black)]" }, void 0, !1, {
          fileName: "app/components/ui/lamp.tsx",
          lineNumber: 19,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { className: "absolute inset-0 z-0 overflow-hidden", children: /* @__PURE__ */ jsxDEV4("div", { className: "absolute -top-[40rem] left-1/2 h-[80rem] w-[80rem] -translate-x-1/2 rounded-full bg-[rgb(var(--primary))] opacity-20 blur-3xl" }, void 0, !1, {
          fileName: "app/components/ui/lamp.tsx",
          lineNumber: 21,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/components/ui/lamp.tsx",
          lineNumber: 20,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { className: "relative z-40 flex w-full flex-col items-center px-4", children }, void 0, !1, {
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
import { Link as Link2 } from "@remix-run/react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function Logo() {
  return /* @__PURE__ */ jsxDEV5(Link2, { to: "/", className: "inline-flex items-center gap-3", children: [
    /* @__PURE__ */ jsxDEV5(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "48",
        height: "48",
        viewBox: "0 0 375 375",
        className: "text-[rgb(var(--primary))]",
        children: [
          /* @__PURE__ */ jsxDEV5("defs", { children: [
            /* @__PURE__ */ jsxDEV5("clipPath", { id: "2468e837ce", children: /* @__PURE__ */ jsxDEV5("path", { d: "M 40 44 L 331 44 L 331 335 L 40 335 Z M 40 44" }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 15,
              columnNumber: 13
            }, this) }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 14,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV5("clipPath", { id: "e5ba6f20f8", children: /* @__PURE__ */ jsxDEV5("path", { d: "M 272.589844 3.695312 L 371.410156 276.605469 L 98.503906 375.425781 L -0.320312 102.519531 Z M 272.589844 3.695312" }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 18,
              columnNumber: 13
            }, this) }, void 0, !1, {
              fileName: "app/components/ui/logo.tsx",
              lineNumber: 17,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV5("clipPath", { id: "eb5849a224", children: /* @__PURE__ */ jsxDEV5("path", { d: "M 272.589844 3.695312 L 371.410156 276.605469 L 98.503906 375.425781 L -0.320312 102.519531 Z M 272.589844 3.695312" }, void 0, !1, {
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
          /* @__PURE__ */ jsxDEV5("g", { clipPath: "url(#2468e837ce)", children: /* @__PURE__ */ jsxDEV5("g", { clipPath: "url(#e5ba6f20f8)", children: /* @__PURE__ */ jsxDEV5("g", { clipPath: "url(#eb5849a224)", children: /* @__PURE__ */ jsxDEV5(
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
    /* @__PURE__ */ jsxDEV5("span", { className: "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500/80", children: "KaitoRewards" }, void 0, !1, {
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
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var meta2 = () => [
  { title: "KaitoRewards - Earn Rewards for Your Contributions" },
  {
    name: "description",
    content: "Discover exciting rewards and opportunities"
  }
];
async function loader2({ request }) {
  let response = new Response(), testData = {
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
  return json2({ rewards, featuredRewards }, { headers: response.headers });
}
function Badge({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxDEV6(
    "span",
    {
      className: `px-2 py-1 text-xs font-semibold rounded-full ${className}`,
      children
    },
    void 0,
    !1,
    {
      fileName: "app/routes/_index.tsx",
      lineNumber: 126,
      columnNumber: 5
    },
    this
  );
}
function RewardCard({ reward }) {
  return /* @__PURE__ */ jsxDEV6(Link3, { to: `/campaigns/${reward.id}`, className: "block h-full", children: /* @__PURE__ */ jsxDEV6("div", { className: "card hover:scale-[1.02] transition-all h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800", children: [
    /* @__PURE__ */ jsxDEV6("div", { className: "absolute -top-4 -right-4 w-12 h-12 rounded-full overflow-hidden border-4 border-slate-900 shadow-xl", children: /* @__PURE__ */ jsxDEV6(
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
        lineNumber: 139,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 138,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { className: "flex justify-between items-start mb-3", children: /* @__PURE__ */ jsxDEV6("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxDEV6("h3", { className: "text-xl font-bold text-white", children: reward.title }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 147,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { className: "flex gap-2", children: [
        reward.isNew && /* @__PURE__ */ jsxDEV6(Badge, { className: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20", children: "New" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 150,
          columnNumber: 17
        }, this),
        reward.isAd && /* @__PURE__ */ jsxDEV6(Badge, { className: "bg-blue-500/10 text-blue-500 border border-blue-500/20", children: "Ad" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 155,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 148,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 146,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 145,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV6("p", { className: "text-slate-300 mb-4 line-clamp-2", children: reward.description }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 162,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { className: "text-2xl font-bold text-[rgb(var(--primary))] mb-4", children: [
      "$",
      typeof reward.value == "number" ? reward.value.toLocaleString() : "0"
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 163,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { className: "flex items-center gap-2 text-slate-400", children: [
      /* @__PURE__ */ jsxDEV6(Clock, { className: "w-4 h-4" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 170,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6("span", { children: [
        "Expires: ",
        new Date(reward.expires_at).toLocaleDateString()
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 171,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 169,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 137,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 136,
    columnNumber: 5
  }, this);
}
function Index() {
  let { rewards, featuredRewards } = useLoaderData2();
  return /* @__PURE__ */ jsxDEV6("div", { className: "min-h-screen bg-slate-950", children: [
    /* @__PURE__ */ jsxDEV6("header", { className: "absolute top-0 left-0 right-0 z-50", children: /* @__PURE__ */ jsxDEV6("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxDEV6("div", { className: "h-24 flex items-center", children: /* @__PURE__ */ jsxDEV6(Logo, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 188,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 187,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 186,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 185,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(Lamp, { children: /* @__PURE__ */ jsxDEV6("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxDEV6("div", { className: "mb-16", children: /* @__PURE__ */ jsxDEV6("div", { className: "p-4 max-w-7xl mx-auto w-full pt-32 md:pt-24", children: [
        /* @__PURE__ */ jsxDEV6("h1", { className: "text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80", children: [
          "Discover Exclusive ",
          /* @__PURE__ */ jsxDEV6("br", {}, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 198,
            columnNumber: 36
          }, this),
          " Rewards & Campaigns"
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 197,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6("p", { className: "mt-4 font-normal text-base text-slate-400 max-w-lg text-center mx-auto", children: "Stay ahead of the curve with KaitoRewards. Get early access to upcoming campaigns, exclusive memberships, and unique opportunities." }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 200,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { className: "mt-8 flex justify-center gap-4", children: [
          /* @__PURE__ */ jsxDEV6(
            Link3,
            {
              to: "/signup",
              className: "px-6 py-3 bg-[rgb(var(--primary))] text-slate-950 rounded-lg font-medium hover:opacity-90 transition-all",
              children: "Get Started"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 206,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV6(
            Link3,
            {
              to: "#featured",
              className: "px-6 py-3 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-all backdrop-blur-sm",
              children: "View Rewards"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 212,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 205,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 196,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 195,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { className: "mb-12", id: "featured", children: [
        /* @__PURE__ */ jsxDEV6("h2", { className: "text-2xl font-bold mb-6 text-white", children: "Featured Rewards" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 223,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: featuredRewards?.map((reward) => /* @__PURE__ */ jsxDEV6(RewardCard, { reward }, reward.id, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 228,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 226,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 222,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { children: [
        /* @__PURE__ */ jsxDEV6("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxDEV6("h2", { className: "text-2xl font-bold text-white", children: "All Rewards" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 235,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV6("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxDEV6("button", { className: "text-slate-400 hover:text-white transition-colors", children: "Latest" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 237,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV6("button", { className: "text-slate-400 hover:text-white transition-colors", children: "Value \u2191" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 240,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 236,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 234,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: rewards?.map((reward) => /* @__PURE__ */ jsxDEV6(RewardCard, { reward }, reward.id, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 247,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 245,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 233,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 194,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 193,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 184,
    columnNumber: 5
  }, this);
}

// app/routes/admin.tsx
var admin_exports = {};
__export(admin_exports, {
  default: () => Admin,
  meta: () => meta3
});
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var meta3 = () => [
  { title: "Admin - Campaign Platform" },
  { name: "description", content: "Manage your campaigns" }
];
function Admin() {
  return /* @__PURE__ */ jsxDEV7("div", { className: "min-h-screen bg-slate-950", children: /* @__PURE__ */ jsxDEV7("nav", { className: "bg-slate-900 border-b border-slate-800 p-4", children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto flex justify-between items-center", children: /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxDEV7(Trophy, { className: "w-6 h-6 text-[rgb(var(--primary))]" }, void 0, !1, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 16,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV7("span", { className: "text-xl font-bold", children: "Admin Dashboard" }, void 0, !1, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 17,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 15,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 14,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-DWPFCAQL.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-YXI754PJ.js", "/build/_shared/chunk-PQM23IGJ.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-XQEXX7AT.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-4DRU4PGS.js", imports: ["/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-2QBUDEHY.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/admin": { id: "routes/admin", parentId: "root", path: "admin", index: void 0, caseSensitive: void 0, module: "/build/routes/admin-AJ3YBUQB.js", imports: ["/build/_shared/chunk-2QBUDEHY.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/campaigns.$id": { id: "routes/campaigns.$id", parentId: "root", path: "campaigns/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/campaigns.$id-6Q6WE2E7.js", imports: ["/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-2QBUDEHY.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "bb5f7d12", hmr: { runtime: "/build/_shared/chunk-PQM23IGJ.js", timestamp: 1742662566626 }, url: "/build/manifest-BB5F7D12.js" };

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
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: admin_exports
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

lucide-react/dist/esm/icons/arrow-left.js:
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

lucide-react/dist/esm/icons/trophy.js:
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
