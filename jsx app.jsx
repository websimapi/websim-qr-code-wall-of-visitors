import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { WebsimSocket, useQuery } from "@websim/use-query";
import QRCode from "qrcode";
const room = new WebsimSocket();
function QRCard({ visitor }) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const profileUrl = `https://websim.com/@${visitor.username}`;
  useEffect(() => {
    QRCode.toDataURL(profileUrl, {
      errorCorrectionLevel: "M",
      margin: 2,
      scale: 4,
      color: {
        dark: "#FFFFFF",
        light: "#1F2937"
        // bg-gray-800
      }
    }).then((url) => {
      setQrCodeUrl(url);
    }).catch((err) => {
      console.error(err);
    });
  }, [profileUrl]);
  if (!qrCodeUrl) {
    return /* @__PURE__ */ jsxDEV("div", { className: "w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-400", children: "Generating..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 33,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 32,
      columnNumber: 13
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("a", { href: profileUrl, target: "_blank", rel: "noopener noreferrer", className: "qr-code-container block bg-gray-800 p-4 rounded-lg shadow-lg text-center", children: [
    /* @__PURE__ */ jsxDEV("img", { src: qrCodeUrl, alt: `QR code for ${visitor.username}`, className: "w-full h-auto rounded-md" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 40,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white truncate", children: [
        "@",
        visitor.username
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 42,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("img", { src: `https://images.websim.com/avatar/${visitor.username}`, alt: visitor.username, className: "w-8 h-8 rounded-full mx-auto mt-2 border-2 border-gray-600" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 43,
        columnNumber: 18
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 41,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 39,
    columnNumber: 9
  }, this);
}
function App() {
  const { data: visitors, loading } = useQuery(room.query(`
        SELECT
            v.id,
            u.username
        FROM public.visitors_v2 v
        JOIN public.user u ON v.id = u.id
    `));
  useEffect(() => {
    const addUser = async () => {
      try {
        const currentUser = await window.websim.getCurrentUser();
        if (currentUser) {
          await room.collection("visitors_v2").upsert({
            id: currentUser.id
          });
        }
      } catch (error) {
        console.error("Error getting current user or updating visitors:", error);
      }
    };
    addUser();
  }, []);
  const shuffledVisitors = useMemo(() => {
    if (!visitors) return [];
    const array = [...visitors];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, [visitors]);
  return /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxDEV("header", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600", children: "Visitor Wall" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 88,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-lg text-gray-300", children: "A randomly-sorted, ever-growing wall of everyone who has visited." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 89,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-md text-gray-400 mt-1", children: "Click a card or scan a QR code to visit a user's profile." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 90,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 87,
      columnNumber: 13
    }, this),
    loading && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-xl", children: "Loading visitors..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 93,
      columnNumber: 25
    }, this),
    !loading && visitors && /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap justify-center gap-6", children: shuffledVisitors.map((visitor) => /* @__PURE__ */ jsxDEV(QRCard, { visitor }, visitor.id, false, {
      fileName: "<stdin>",
      lineNumber: 98,
      columnNumber: 25
    }, this)) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 96,
      columnNumber: 18
    }, this),
    !loading && (!visitors || visitors.length === 0) && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-xl text-gray-500", children: [
      /* @__PURE__ */ jsxDEV("p", { children: "Be the first visitor to appear on the wall!" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("p", { children: "(You should appear shortly)" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 106,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 104,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 86,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 114,
  columnNumber: 13
}));
