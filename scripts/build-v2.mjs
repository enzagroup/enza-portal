// Generates apis/generalapi-v2.yaml from apis/generalapi.yaml.
//
// Applies the production migration rules:
//   - REST resource renames + verb changes (POST -> PATCH/DELETE/GET) per the mapping table
//   - sensitive/safe IDs moved between path and body
//   - mailing/delivery address: countryId -> countryCode
//   - the v2 response standard: unenveloped success + `meta` sidecar,
//     { code, message, details? } errors, 201 for creations, status remap.
//
// Run: node scripts/build-v2.mjs

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "apis", "generalapi.yaml");
const OUT = path.join(__dirname, "..", "apis", "generalapi-v2.yaml");

const doc = yaml.load(readFileSync(SRC, "utf8"));
const clone = (x) => structuredClone(x);

// ---------------------------------------------------------------------------
// Migration mapping. from:[method, path] -> to:[method, path].
//   bodyToPath: body fields that become path params (R3/R4 — no duplicated id).
//   pathToBody: path params that become body fields (R5 — sensitive id out of URL).
//   rename:     { oldProp: newProp } applied to the request body (incl. nested mailAddress).
// ---------------------------------------------------------------------------
const MAP = [
  // Products
  { from: ["get", "/products/retrieve"], to: ["get", "/cards/products"] },

  // Customers
  { from: ["post", "/customers/create"], to: ["post", "/customers"], rename: { "mailAddress.countryId": "countryCode" } },
  { from: ["post", "/customers/search"], to: ["post", "/customers/search"] },
  { from: ["post", "/customers/details"], to: ["post", "/customers/lookup"] },
  { from: ["post", "/customers/update"], to: ["post", "/customers/profile-update-requests"], rename: { "mailAddress.countryId": "countryCode" } },
  { from: ["post", "/customers/list-of-cards"], to: ["post", "/customers/cards/lookup"] },
  { from: ["post", "/customers/list-accounts"], to: ["post", "/customers/accounts/lookup"] },

  // Accounts
  { from: ["post", "/accounts/joint-account"], to: ["post", "/accounts/joint"] },
  { from: ["get", "/accounts/account-info/{accountNumber}"], to: ["post", "/accounts/lookup"], pathToBody: ["accountNumber"] },
  { from: ["post", "/accounts/status"], to: ["post", "/accounts/status-change-requests"] },
  { from: ["get", "/accounts/cards/{accountNumber}"], to: ["post", "/accounts/cards/lookup"], pathToBody: ["accountNumber"] },
  { from: ["post", "/accounts/unlink-card-from-account"], to: ["post", "/accounts/card-unlinks"] },

  // Notifications
  { from: ["post", "/notification/status"], to: ["post", "/notifications/status"] },
  { from: ["post", "/notification/manage"], to: ["post", "/notifications/preferences"] },

  // Card creation & issuance
  { from: ["post", "/instant-issuing"], to: ["post", "/cards/instant-issuance"] },
  { from: ["post", "/cards/create-prepaid"], to: ["post", "/cards/prepaid"] },
  { from: ["post", "/cards/create-debit"], to: ["post", "/cards/debit"] },
  { from: ["post", "/cards/create-supplementary"], to: ["post", "/cards/supplementary"] },

  // Card linking
  { from: ["post", "/cards/link-card-to-account"], to: ["post", "/cards/account-links"] },
  { from: ["post", "/cards/link-supplementary-card"], to: ["post", "/cards/supplementary-links"] },

  // Card status & controls
  { from: ["post", "/cards/update-status-by-ref"], to: ["post", "/cards/status-change-requests"] },
  { from: ["post", "/cards/update-status-by-id"], to: ["patch", "/cards/{cardId}/status"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/risk-level"], to: ["patch", "/cards/{cardId}/risk-level"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/emv-status"], to: ["patch", "/cards/{cardId}/emv-status"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/contactless-status"], to: ["patch", "/cards/{cardId}/contactless-status"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/temporary-disable-restriction"], to: ["post", "/cards/{cardId}/temporary-restrictions"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/remove-temporary-disable-restriction"], to: ["post", "/cards/{cardId}/temporary-restriction-removals"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/embossed-name"], to: ["patch", "/cards/{cardId}/embossed-name"], bodyToPath: ["cardId"] },

  // Card details & per-card reads
  { from: ["get", "/cards/card-details/{card_Id}"], to: ["get", "/cards/{cardId}"] },
  { from: ["get", "/cards/pin-trials"], to: ["get", "/cards/{cardId}/pin-trials"], bodyToPath: ["cardId"] },

  // CVV2
  { from: ["post", "/cards/get-cvv2/by_card_data"], to: ["post", "/cards/cvv2/display-requests"] },
  { from: ["get", "/cards/get-cvv2/by_card_id/{cardId}"], to: ["post", "/cards/{cardId}/cvv2/display-requests"] },
  { from: ["post", "/cards/verify-cvv2"], to: ["post", "/cards/cvv2/verifications"] },

  // Delivery address
  { from: ["post", "/cards/delivery-address"], to: ["post", "/cards/{cardId}/delivery-addresses"], bodyToPath: ["cardId"], rename: { countryId: "countryCode" }, textCountryFix: true },
  { from: ["get", "/cards/delivery-address/{card_Id}"], to: ["get", "/cards/{cardId}/delivery-address"], responseRename: { countryId: "countryCode" } },
  { from: ["delete", "/cards/delivery-address/{card_Id}"], to: ["delete", "/cards/{cardId}/delivery-address"] },

  // PIN
  { from: ["post", "/pin/set-pin-by-pan"], to: ["post", "/cards/pin-set-requests"] },
  { from: ["post", "/pin/set-pin-by-card-id"], to: ["post", "/cards/{cardId}/pin-set-requests"], bodyToPath: ["cardId"] },
  { from: ["post", "/pin/change"], to: ["post", "/cards/{cardId}/pin-change-requests"], bodyToPath: ["cardId"] },
  { from: ["post", "/pin/reset-pin-counter"], to: ["post", "/cards/{cardId}/pin-counter-reset-requests"], bodyToPath: ["cardId"] },
  { from: ["post", "/pin/verify"], to: ["post", "/cards/{cardId}/pin-verifications"], bodyToPath: ["cardId"] },
  { from: ["post", "/pin/reveals"], to: ["post", "/cards/{cardId}/pin-display-requests"], bodyToPath: ["cardId"] },

  // Holds
  { from: ["post", "/holds/debit"], to: ["post", "/holds/debits"] },
  { from: ["post", "/holds/release"], to: ["post", "/holds/releases"] },
  { from: ["post", "/holds/increase"], to: ["post", "/holds/increases"] },
  { from: ["post", "/holds/decrease"], to: ["post", "/holds/decreases"] },
  { from: ["get", "/holds/{accountNumber}"], to: ["post", "/holds/search"], pathToBody: ["accountNumber"] },

  // Top-ups
  { from: ["post", "/cards/top-ups"], to: ["post", "/cards/{cardId}/top-ups"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/reverse-top-ups"], to: ["post", "/cards/{cardId}/top-up-reversals"], bodyToPath: ["cardId"] },

  // Preproduced flows
  { from: ["post", "/preproduced/prepaid/new-customer"], to: ["post", "/cards/preproduced/prepaid/customer-onboarding"] },
  { from: ["post", "/preproduced/prepaid/existing-customer"], to: ["post", "/cards/preproduced/prepaid/customer-linking"] },
  { from: ["post", "/preproduced/prepaid/dummy-customer"], to: ["post", "/cards/preproduced/prepaid/dummy-customer-linking"] },
  { from: ["post", "/preproduced/debit/new-account-new-customer"], to: ["post", "/cards/preproduced/debit/customer-and-account-onboarding"] },
  { from: ["post", "/preproduced/debit/new-account-existing-customer"], to: ["post", "/cards/preproduced/debit/account-onboarding"] },
  { from: ["post", "/preproduced/debit/existing-account-existing-customer"], to: ["post", "/cards/preproduced/debit/account-linking"] },

  // Card lifecycle
  { from: ["post", "/cards/renew"], to: ["post", "/cards/{cardId}/renewals"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/reissue"], to: ["post", "/cards/{cardId}/reissues"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/replace"], to: ["post", "/cards/{cardId}/replacements"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/convert-virtual-to-physical"], to: ["post", "/cards/{cardId}/physical-conversions"], bodyToPath: ["cardId"] },

  // Transactions
  { from: ["post", "/cards/list-of-transactions"], to: ["post", "/cards/{cardId}/transactions"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/settled-transactions"], to: ["post", "/cards/{cardId}/transactions/settled"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/unsettled-transactions"], to: ["post", "/cards/{cardId}/transactions/unsettled"], bodyToPath: ["cardId"] },

  // Limits
  { from: ["post", "/limits/atm-status"], to: ["patch", "/cards/{cardId}/limits/atm-status"], bodyToPath: ["cardId"] },
  { from: ["post", "/limits/pos-status"], to: ["patch", "/cards/{cardId}/limits/pos-status"], bodyToPath: ["cardId"] },
  { from: ["post", "/limits/ecomm-status"], to: ["patch", "/cards/{cardId}/limits/ecommerce-status"], bodyToPath: ["cardId"] },
  { from: ["get", "/limits/restricted-terminals"], to: ["get", "/cards/{cardId}/limits/restricted-terminals"], bodyToPath: ["cardId"] },
  { from: ["get", "/limits/retrieve/{card_Id}"], to: ["get", "/cards/{cardId}/limits"] },
  { from: ["post", "/limits/update-usage"], to: ["patch", "/cards/{cardId}/limits/usage"], bodyToPath: ["cardId"] },
  { from: ["post", "/limits/change-limit"], to: ["patch", "/cards/{cardId}/limits"], bodyToPath: ["cardId"] },

  // Credit limit
  { from: ["post", "/cards/set-credit-limit"], to: ["patch", "/cards/{cardId}/credit-limit"], bodyToPath: ["cardId"] },

  // ATC
  { from: ["get", "/cards/last-atc"], to: ["get", "/cards/{cardId}/atc"], bodyToPath: ["cardId"] },
  { from: ["post", "/cards/reset-atc"], to: ["post", "/cards/{cardId}/atc/resets"], bodyToPath: ["cardId"] },

  // Transfers
  { from: ["post", "/accounts/account-to-card-transfer"], to: ["post", "/transfers/account-to-card"] },
  { from: ["post", "/accounts/account-to-account-transfer"], to: ["post", "/transfers/account-to-account"] },
  { from: ["post", "/accounts/card-to-account-transfer"], to: ["post", "/transfers/card-to-account"] },
  { from: ["post", "/accounts/card-to-card-transfer"], to: ["post", "/transfers/card-to-card"] },
  { from: ["post", "/accounts/pan-to-pan-transfer"], to: ["post", "/transfers/pan-to-pan"] },
];

// POST endpoints that are reads (no resource created -> stay 200, not 201).
const READ_POST = new Set([
  "/customers/search", "/customers/lookup", "/customers/cards/lookup",
  "/customers/accounts/lookup", "/accounts/lookup", "/accounts/cards/lookup",
  "/holds/search", "/cards/{cardId}/transactions",
  "/cards/{cardId}/transactions/settled", "/cards/{cardId}/transactions/unsettled",
  "/notifications/status", "/cards/cvv2/verifications", "/cards/{cardId}/cvv2/display-requests",
  "/cards/cvv2/display-requests", "/cards/{cardId}/pin-verifications",
  "/cards/{cardId}/pin-display-requests",
]);

const META_SCHEMA_REF = { $ref: "#/components/schemas/Meta" };
const metaExample = () => ({ requestId: "260519453094700226", timestamp: "2026-05-20T09:11:11.566Z" });

// ---------------------------------------------------------------------------
// Body helpers
// ---------------------------------------------------------------------------
function jsonContent(op) {
  return op.requestBody?.content?.["application/json"];
}
function eachExampleValue(content, fn) {
  if (!content) return;
  if (content.example && typeof content.example === "object") fn(content.example);
  if (content.examples) for (const ex of Object.values(content.examples)) if (ex && typeof ex.value === "object") fn(ex.value);
  if (content.schema?.example && typeof content.schema.example === "object") fn(content.schema.example);
}

function removeBodyProp(op, name) {
  const c = jsonContent(op);
  if (!c) return;
  const s = c.schema;
  if (s?.properties) delete s.properties[name];
  if (Array.isArray(s?.required)) s.required = s.required.filter((r) => r !== name);
  eachExampleValue(c, (v) => { delete v[name]; });
}

function addBodyProp(op, name) {
  op.requestBody = op.requestBody || { required: true, content: { "application/json": { schema: { type: "object", properties: {} } } } };
  const c = jsonContent(op);
  c.schema = c.schema || { type: "object", properties: {} };
  c.schema.properties = c.schema.properties || {};
  c.schema.properties[name] = { type: "string", description: `**Required.** ${name}` };
  c.schema.required = Array.from(new Set([...(c.schema.required || []), name]));
  if (!c.example && !c.examples) c.example = {};
  if (c.example) c.example[name] = c.example[name] ?? "100000000001488";
}

function renameBodyProp(op, oldName, newName) {
  const c = jsonContent(op);
  if (!c) return;
  // nested form "mailAddress.countryId"
  if (oldName.includes(".")) {
    const [parent, child] = oldName.split(".");
    const p = c.schema?.properties?.[parent];
    if (p?.properties?.[child]) { p.properties[newName] = p.properties[child]; delete p.properties[child]; }
    eachExampleValue(c, (v) => { if (v[parent] && child in v[parent]) { v[parent][newName] = v[parent][child]; delete v[parent][child]; } });
    return;
  }
  const s = c.schema;
  if (s?.properties?.[oldName]) {
    s.properties[newName] = s.properties[oldName];
    if (s.properties[newName].description) s.properties[newName].description = s.properties[newName].description.replace(/country (numeric )?code \(ISO 3166-1 numeric[^)]*\)/i, "Country code (ISO 3166-1 alpha-2, e.g. GH)");
    delete s.properties[oldName];
  }
  if (Array.isArray(s?.required)) s.required = s.required.map((r) => (r === oldName ? newName : r));
  eachExampleValue(c, (v) => { if (oldName in v) { v[newName] = v[oldName]; delete v[oldName]; } });
}

// Recursively rename an object key everywhere within a subtree (schemas + examples).
function deepRenameKey(node, oldKey, newKey) {
  if (Array.isArray(node)) { for (const x of node) deepRenameKey(x, oldKey, newKey); return; }
  if (!node || typeof node !== "object") return;
  if (oldKey in node) { node[newKey] = node[oldKey]; delete node[oldKey]; }
  for (const v of Object.values(node)) deepRenameKey(v, oldKey, newKey);
}

function ensurePathParam(op, name) {
  op.parameters = op.parameters || [];
  const inline = op.parameters.filter((p) => !p.$ref);
  const existing = inline.find((p) => p.in === "path" && (p.name === name || p.name === "card_Id"));
  if (existing) { existing.name = name; return; }
  op.parameters.push({ name, in: "path", required: true, schema: { type: "string" }, description: `**Required.** ${name}` });
}

// ---------------------------------------------------------------------------
// Response helpers
// ---------------------------------------------------------------------------
const SUCCESS_REF = {
  "#/components/schemas/SuccessEnvelope": { requestType: { type: "string", example: "NewAccountNewCustomer" } },
  "#/components/schemas/successResponse": { message: { type: "string", example: "Request processed successfully" } },
};

function remapStatus(orig, code) {
  if (orig[0] === "2") return orig;
  const C = (code || "").toUpperCase();
  if (/INVALID_COUNTRY/.test(C)) return "400";
  if (/NOT_FOUND/.test(C)) return "404";
  if (/ALREADY_EXISTS|DUPLICATE|ALREADY_ASSIGNED|ACCOUNT_EXISTS|SERVICE_EXISTS/.test(C)) return "409";
  if (/TIMEOUT/.test(C)) return "504";
  if (/SOAP|RTP/.test(C)) return "502";
  if (orig === "409") return "422";
  return orig;
}

function buildSuccessSchema(origSchema) {
  let resourceProps = {};
  let required;
  if (origSchema?.$ref && SUCCESS_REF[origSchema.$ref]) {
    resourceProps = clone(SUCCESS_REF[origSchema.$ref]);
  } else if (origSchema?.properties?.params) {
    resourceProps = clone(origSchema.properties.params.properties || {});
    required = origSchema.properties.params.required;
  }
  const schema = { type: "object", properties: { ...resourceProps, meta: META_SCHEMA_REF } };
  if (required?.length) schema.required = required;
  return schema;
}

function unwrapSuccessValue(v) {
  if (v && v.params && typeof v.params === "object") return { ...v.params, meta: metaExample() };
  if (v && typeof v === "object") { const { code, ...rest } = v; return { ...rest, meta: metaExample() }; }
  return { meta: metaExample() };
}

const ERROR_SCHEMA_REF = { $ref: "#/components/schemas/ApiError" };

function transformResponses(op, { isCreate }) {
  const out = {};
  for (const [status, resp] of Object.entries(op.responses || {})) {
    // $ref to a shared component response -> keep (components are rewritten to v2 shape).
    if (resp.$ref) { out[status] = resp; continue; }
    const c = resp.content?.["application/json"];

    if (status[0] === "2") {
      const newStatus = isCreate && status === "200" ? "201" : status;
      const newResp = { description: resp.description };
      if (c) {
        newResp.content = { "application/json": { schema: buildSuccessSchema(c.schema) } };
        const exs = {};
        if (c.examples) for (const [k, ex] of Object.entries(c.examples)) exs[k] = { summary: ex.summary, value: unwrapSuccessValue(ex.value) };
        else if (c.schema?.example) exs.success = { summary: "Success", value: unwrapSuccessValue(c.schema.example) };
        if (Object.keys(exs).length) newResp.content["application/json"].examples = exs;
      }
      out[newStatus] = newResp;
      continue;
    }

    // error response (4xx/5xx) — may split across target statuses by code.
    const entries = [];
    if (c?.examples) for (const [k, ex] of Object.entries(c.examples)) entries.push([k, ex.summary, ex.value]);
    else {
      const v = c?.schema?.example
        || (c?.schema?.properties?.code?.example ? { code: c.schema.properties.code.example } : null);
      entries.push(["error", resp.description, v || { code: "ERR_REQUEST_DECLINED" }]);
    }
    for (const [key, summary, value] of entries) {
      const code = value?.code;
      const tgt = remapStatus(status, code);
      const noMeta = tgt === "400" || tgt === "401";
      const msg = value?.params?.message ?? value?.message ?? resp.description;
      const exVal = { code, message: msg };
      if (value?.params?.details) exVal.details = value.params.details;
      if (!noMeta) exVal.meta = metaExample();
      out[tgt] = out[tgt] || { description: resp.description, content: { "application/json": { schema: ERROR_SCHEMA_REF, examples: {} } } };
      out[tgt].content["application/json"].examples[key] = { summary, value: exVal };
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Build v2 paths
// ---------------------------------------------------------------------------
const v2Paths = {};
const usedOpIds = new Set();
function uniqueOpId(method, p) {
  const base = method + p.replace(/[{}]/g, "").split(/[/-]/).filter(Boolean)
    .map((s, i) => (i === 0 ? s : s[0].toUpperCase() + s.slice(1))).join("");
  let id = base, n = 2;
  while (usedOpIds.has(id)) id = base + n++;
  usedOpIds.add(id);
  return id;
}

for (const m of MAP) {
  const [fromMethod, fromPath] = m.from;
  const [toMethod, toPath] = m.to;
  const srcOp = doc.paths?.[fromPath]?.[fromMethod];
  if (!srcOp) { console.warn(`! missing source ${fromMethod.toUpperCase()} ${fromPath}`); continue; }
  const op = clone(srcOp);

  // body <-> path moves
  for (const f of m.bodyToPath || []) { removeBodyProp(op, f); ensurePathParam(op, f); }
  for (const f of m.pathToBody || []) {
    op.parameters = (op.parameters || []).filter((p) => p.$ref || !(p.in === "path" && (p.name === f || p.name === "card_Id" || p.name === "accountNumber")));
    addBodyProp(op, f);
  }
  // path-param rename (card_Id -> cardId) for reads that keep a path id
  for (const seg of toPath.match(/{([^}]+)}/g) || []) {
    const name = seg.slice(1, -1);
    if (!(m.bodyToPath || []).includes(name) && !(m.pathToBody || []).includes(name)) ensurePathParam(op, name);
  }
  // address country rename
  if (m.rename) for (const [o, nw] of Object.entries(m.rename)) renameBodyProp(op, o, nw);

  const isCreate = toMethod === "post" && !READ_POST.has(toPath);
  op.responses = transformResponses(op, { isCreate });

  // delivery address: GET response also returns countryCode (matches tx-cards-delivery-address-v2)
  if (m.responseRename) for (const [o, nw] of Object.entries(m.responseRename)) deepRenameKey(op.responses, o, nw);
  // POST delivery-addresses: scrub residual "countryId" from prose/examples (now countryCode)
  if (m.textCountryFix) {
    if (op.description) op.description = op.description.replace(/countryId/g, "countryCode");
    const fixStrings = (n) => {
      if (typeof n !== "object" || !n) return;
      for (const [k, v] of Object.entries(n)) {
        if (typeof v === "string") n[k] = v.replace(/countryId/g, "countryCode");
        else fixStrings(v);
      }
    };
    fixStrings(op.responses);
  }

  op.operationId = uniqueOpId(toMethod, toPath);

  v2Paths[toPath] = v2Paths[toPath] || {};
  v2Paths[toPath][toMethod] = op;
}

// ---------------------------------------------------------------------------
// Rebuild the document
// ---------------------------------------------------------------------------
const errExamples = (code, message, details) => {
  const v = { code, message };
  if (details) v.details = details;
  return v;
};

const v2 = {
  openapi: doc.openapi,
  info: {
    ...doc.info,
    title: "enza REST API Documentation (v2)",
    version: "2.0.0",
    description:
      "Version 2.0 of the enza REST API.\n\n" +
      "**What changed from v1**\n" +
      "- RESTful resource naming: verbs removed from paths, plural collections, kebab-case.\n" +
      "- Partial updates use `PATCH`; the safe `{cardId}` lives in the path, not the body.\n" +
      "- Sensitive identifiers (PAN, account number, national id) stay in the request body, never the URL.\n" +
      "- Mailing/delivery address uses `countryCode` (ISO 3166-1 alpha-2) instead of `countryId`.\n" +
      "- Responses are unenveloped: success returns the resource at the root plus a `meta` sidecar; " +
      "errors return `{ code, message, details? }`. Resource creation returns `201`.\n",
  },
  servers: [{ url: "https://uat-api.enza.cloud/TX/v2" }],
  tags: doc.tags,
  paths: v2Paths,
  components: {
    parameters: doc.components.parameters,
    schemas: {
      ...doc.components.schemas,
      Meta: {
        type: "object",
        description: "Present only after the request reached the core system. `requestId` is the RTP transaction id.",
        properties: {
          requestId: { type: "string", example: "260519453094700226" },
          timestamp: { type: "string", format: "date-time", example: "2026-05-20T09:11:11.566Z" },
        },
      },
      ApiError: {
        type: "object",
        required: ["code", "message"],
        properties: {
          code: { type: "string", example: "ERR_VALIDATION_FAILED" },
          message: { type: "string", example: "Validation failed" },
          details: {
            type: "array",
            description: "Per-field validation problems. Present for ERR_VALIDATION_FAILED.",
            items: { type: "object", properties: { field: { type: "string" }, reason: { type: "string" } } },
          },
          meta: META_SCHEMA_REF,
        },
      },
    },
    responses: {
      ValidationError: {
        description: "Validation failed",
        content: { "application/json": { schema: ERROR_SCHEMA_REF, examples: {
          validationError: { summary: "Validation failed", value: { code: "ERR_VALIDATION_FAILED", message: "Validation failed", details: [{ field: "email", reason: "Invalid email format" }] } },
        } } },
      },
      BadRequest: {
        description: "Bad Request - validation failed",
        content: { "application/json": { schema: ERROR_SCHEMA_REF, examples: {
          badRequest: { summary: "Missing required field", value: { code: "ERR_VALIDATION_FAILED", message: "Validation failed", details: [{ field: "requestType", reason: "Required field missing" }] } },
        } } },
      },
      Unauthorized: {
        description: "Unauthorized - missing or invalid API key",
        content: { "application/json": { schema: ERROR_SCHEMA_REF, examples: {
          unauthorized: { summary: "Missing API key", value: errExamples("ERR_UNAUTHORIZED", "Missing or invalid API key. Please provide a valid API key in the request header.") },
        } } },
      },
      Forbidden: {
        description: "Forbidden - invalid API key or insufficient permissions",
        content: { "application/json": { schema: ERROR_SCHEMA_REF, examples: {
          forbidden: { summary: "Forbidden", value: errExamples("ERR_FORBIDDEN", "Access denied. You do not have permission to access this resource.") },
        } } },
      },
      MethodNotAllowed: {
        description: "Method not allowed",
        content: { "application/json": { schema: ERROR_SCHEMA_REF, examples: {
          methodNotAllowed: { summary: "Method not allowed", value: errExamples("ERR_METHOD_NOT_ALLOWED", "HTTP method not allowed for this endpoint.") },
        } } },
      },
      ConflictError: {
        description: "Conflict - operation declined",
        content: { "application/json": { schema: ERROR_SCHEMA_REF, examples: {
          requestDeclined: { summary: "Operation declined", value: { ...errExamples("ERR_REQUEST_DECLINED", "Operation was declined"), meta: metaExample() } },
        } } },
      },
      InternalServerError: {
        description: "An unexpected error occurred",
        content: { "application/json": { schema: ERROR_SCHEMA_REF, examples: {
          internalError: { summary: "Internal server error", value: { ...errExamples("ERR_INTERNAL_SERVER_ERROR", "An unexpected error occurred."), meta: metaExample() } },
        } } },
      },
      LambdaTimeout: {
        description: "Upstream request timed out",
        content: { "application/json": { schema: ERROR_SCHEMA_REF, examples: {
          timeout: { summary: "Request timed out", value: { ...errExamples("ERR_TIMEOUT", "Request timed out."), meta: metaExample() } },
        } } },
      },
    },
  },
};

writeFileSync(OUT, yaml.dump(v2, { lineWidth: 120, noRefs: true }), "utf8");
console.log(`Wrote ${OUT}`);
console.log(`Endpoints: ${Object.values(v2Paths).reduce((n, o) => n + Object.keys(o).length, 0)}`);
