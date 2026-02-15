#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "neighborshare-content-safety",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Prohibited items list
const PROHIBITED = [
  "drug", "weed", "marijuana", "cocaine", "pills",
  "gun", "weapon", "knife", "explosive", "bomb",
  "alcohol", "beer", "wine", "cigarette", "tobacco",
  "scam", "mlm", "pyramid", "bitcoin",
  "sex", "adult", "porn"
];

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "check_content_safety",
        description: "Check if post content is safe and allowed",
        inputSchema: {
          type: "object",
          properties: {
            title: { type: "string", description: "Post title" },
            description: { type: "string", description: "Post description" },
            category: { type: "string", description: "Item category" }
          },
          required: ["title", "description"]
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "check_content_safety") {
    const { title, description, category } = request.params.arguments;
    
    const fullText = `${title} ${description} ${category || ""}`.toLowerCase();
    
    // Check for prohibited items
    const foundProhibited = PROHIBITED.find(word => fullText.includes(word));
    
    if (foundProhibited) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            allowed: false,
            reason: `Prohibited item detected: "${foundProhibited}"`,
            action: "POST_BLOCKED",
            suggestion: "Please review community guidelines",
            severity: "HIGH"
          }, null, 2)
        }]
      };
    }
    
    // Check for suspicious patterns
    const suspicious = [
      { pattern: /money.*quick/i, reason: "Potential scam pattern" },
      { pattern: /send.*cash/i, reason: "Suspicious payment request" },
      { pattern: /meet.*alone/i, reason: "Safety concern" }
    ];
    
    const suspiciousMatch = suspicious.find(s => s.pattern.test(fullText));
    
    if (suspiciousMatch) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            allowed: true,
            warning: suspiciousMatch.reason,
            action: "FLAGGED_FOR_REVIEW",
            severity: "MEDIUM"
          }, null, 2)
        }]
      };
    }
    
    // All good!
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          allowed: true,
          action: "APPROVED",
          message: "Content passed safety checks",
          severity: "NONE"
        }, null, 2)
      }]
    };
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✓ Content Safety MCP Ready");
  console.error("✓ Monitoring for prohibited items");
}

main().catch(console.error);